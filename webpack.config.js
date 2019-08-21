const path = require('path');
const fs = require('fs');
const MCEP = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const stylesheet = !!process.env.GENERATE_CSS_FILE;

const getConfig = ({nomodule = false} = {}) => {
  const browsers = nomodule ? ['ie 11'] : [
  // NOTE: I'm not using the `esmodules` target due to this issue:
  // https://github.com/babel/babel/issues/8809
    'last 2 Chrome versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'last 2 Edge versions',
    'Firefox ESR',
  ];

  return {
    name: nomodule ? 'nomodule' : 'module',
    mode: isProduction ? 'production' : 'development',
    entry: './src/main-nomodule.mjs',
    output: {
      path: path.resolve(__dirname, 'public'),
      jsonpScriptType: 'module',
      filename: nomodule ? '[name]-[contenthash].nomodule.js' : '[name]-[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            stylesheet ? MCEP.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.mjs$/,
          type: 'javascript/auto',
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {browsers},
              useBuiltIns: 'usage',
              // debug: true,
              corejs: 3,
            }]],
            plugins: [['@babel/plugin-transform-react-jsx']],
          },
        },
      ],
    },
    optimization: {
      splitChunks: nomodule ? {
        name: false,
        chunks: 'all',

      } : {
        name: false,
        chunks: 'all',
        maxSize: 100000,
        maxInitialRequests: 100,
        maxAsyncRequests: 100,
      },
    },
    plugins: [
      stylesheet && new MCEP({
        filename: '[name]-[contenthash].css',
      }),
      (compiler) => {
        compiler.hooks.done.tap('webpack.config.js', (stats) => {
          fs.writeFileSync(
              path.resolve(__dirname, 'public',
                nomodule ?
                    'webpack-manifest.nomodule.json' :
                    'webpack-manifest.json'
              ),
              JSON.stringify(stats.toJson({
                all: false,
                entrypoints: true,
              }).entrypoints, null, 2)
          );
        });
      },
    ].filter((x) => x),
    stats: {
      chunkModules: true,
      chunks: true,
      excludeModules: [],
      modules: false,
    },
  };
};

module.exports = isProduction ? [
  getConfig(),
  getConfig({nomodule: true}),
] : getConfig();
