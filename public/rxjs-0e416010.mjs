var r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n])})(t,n)};function t(t,n){function e(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}function n(r){return"function"==typeof r}var e=!1,o={Promise:void 0,set useDeprecatedSynchronousErrorHandling(r){r&&(new Error).stack;e=r},get useDeprecatedSynchronousErrorHandling(){return e}};function s(r){setTimeout(function(){throw r},0)}var i={closed:!0,next:function(r){},error:function(r){if(o.useDeprecatedSynchronousErrorHandling)throw r;s(r)},complete:function(){}},c=Array.isArray||function(r){return r&&"number"==typeof r.length};function u(r){return Error.call(this),this.message=r?r.length+" errors occurred during unsubscription:\n"+r.map(function(r,t){return t+1+") "+r.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=r,this}u.prototype=Object.create(Error.prototype);var a=u,h=function(){function r(r){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,r&&(this._unsubscribe=r)}return r.prototype.unsubscribe=function(){var t;if(!this.closed){var e,o=this._parentOrParents,s=this._unsubscribe,i=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,o instanceof r)o.remove(this);else if(null!==o)for(var u=0;u<o.length;++u){o[u].remove(this)}if(n(s))try{s.call(this)}catch(r){t=r instanceof a?p(r.errors):[r]}if(c(i)){u=-1;for(var h=i.length;++u<h;){var b=i[u];if(null!==(e=b)&&"object"==typeof e)try{b.unsubscribe()}catch(r){t=t||[],r instanceof a?t=t.concat(p(r.errors)):t.push(r)}}}if(t)throw new a(t)}},r.prototype.add=function(t){var n=t;if(!t)return r.EMPTY;switch(typeof t){case"function":n=new r(t);case"object":if(n===this||n.closed||"function"!=typeof n.unsubscribe)return n;if(this.closed)return n.unsubscribe(),n;if(!(n instanceof r)){var e=n;(n=new r)._subscriptions=[e]}break;default:throw new Error("unrecognized teardown "+t+" added to Subscription.")}var o=n._parentOrParents;if(null===o)n._parentOrParents=this;else if(o instanceof r){if(o===this)return n;n._parentOrParents=[o,this]}else{if(-1!==o.indexOf(this))return n;o.push(this)}var s=this._subscriptions;return null===s?this._subscriptions=[n]:s.push(n),n},r.prototype.remove=function(r){var t=this._subscriptions;if(t){var n=t.indexOf(r);-1!==n&&t.splice(n,1)}},r.EMPTY=function(r){return r.closed=!0,r}(new r),r}();function p(r){return r.reduce(function(r,t){return r.concat(t instanceof a?t.errors:t)},[])}var b="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),f=function(r){function n(t,e,o){var s=r.call(this)||this;switch(s.syncErrorValue=null,s.syncErrorThrown=!1,s.syncErrorThrowable=!1,s.isStopped=!1,arguments.length){case 0:s.destination=i;break;case 1:if(!t){s.destination=i;break}if("object"==typeof t){t instanceof n?(s.syncErrorThrowable=t.syncErrorThrowable,s.destination=t,t.add(s)):(s.syncErrorThrowable=!0,s.destination=new l(s,t));break}default:s.syncErrorThrowable=!0,s.destination=new l(s,t,e,o)}return s}return t(n,r),n.prototype[b]=function(){return this},n.create=function(r,t,e){var o=new n(r,t,e);return o.syncErrorThrowable=!1,o},n.prototype.next=function(r){this.isStopped||this._next(r)},n.prototype.error=function(r){this.isStopped||(this.isStopped=!0,this._error(r))},n.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},n.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,r.prototype.unsubscribe.call(this))},n.prototype._next=function(r){this.destination.next(r)},n.prototype._error=function(r){this.destination.error(r),this.unsubscribe()},n.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},n.prototype._unsubscribeAndRecycle=function(){var r=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=r,this},n}(h),l=function(r){function e(t,e,o,s){var c,u=r.call(this)||this;u._parentSubscriber=t;var a=u;return n(e)?c=e:e&&(c=e.next,o=e.error,s=e.complete,e!==i&&(n((a=Object.create(e)).unsubscribe)&&u.add(a.unsubscribe.bind(a)),a.unsubscribe=u.unsubscribe.bind(u))),u._context=a,u._next=c,u._error=o,u._complete=s,u}return t(e,r),e.prototype.next=function(r){if(!this.isStopped&&this._next){var t=this._parentSubscriber;o.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?this.__tryOrSetError(t,this._next,r)&&this.unsubscribe():this.__tryOrUnsub(this._next,r)}},e.prototype.error=function(r){if(!this.isStopped){var t=this._parentSubscriber,n=o.useDeprecatedSynchronousErrorHandling;if(this._error)n&&t.syncErrorThrowable?(this.__tryOrSetError(t,this._error,r),this.unsubscribe()):(this.__tryOrUnsub(this._error,r),this.unsubscribe());else if(t.syncErrorThrowable)n?(t.syncErrorValue=r,t.syncErrorThrown=!0):s(r),this.unsubscribe();else{if(this.unsubscribe(),n)throw r;s(r)}}},e.prototype.complete=function(){var r=this;if(!this.isStopped){var t=this._parentSubscriber;if(this._complete){var n=function(){return r._complete.call(r._context)};o.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,n),this.unsubscribe()):(this.__tryOrUnsub(n),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(r,t){try{r.call(this._context,t)}catch(r){if(this.unsubscribe(),o.useDeprecatedSynchronousErrorHandling)throw r;s(r)}},e.prototype.__tryOrSetError=function(r,t,n){if(!o.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{t.call(this._context,n)}catch(t){return o.useDeprecatedSynchronousErrorHandling?(r.syncErrorValue=t,r.syncErrorThrown=!0,!0):(s(t),!0)}return!1},e.prototype._unsubscribe=function(){var r=this._parentSubscriber;this._context=null,this._parentSubscriber=null,r.unsubscribe()},e}(f);var y="function"==typeof Symbol&&Symbol.observable||"@@observable";function d(){}function _(r){return r?1===r.length?r[0]:function(t){return r.reduce(function(r,t){return t(r)},t)}:d}var w=function(){function r(r){this._isScalar=!1,r&&(this._subscribe=r)}return r.prototype.lift=function(t){var n=new r;return n.source=this,n.operator=t,n},r.prototype.subscribe=function(r,t,n){var e=this.operator,s=function(r,t,n){if(r){if(r instanceof f)return r;if(r[b])return r[b]()}return r||t||n?new f(r,t,n):new f(i)}(r,t,n);if(e?s.add(e.call(s,this.source)):s.add(this.source||o.useDeprecatedSynchronousErrorHandling&&!s.syncErrorThrowable?this._subscribe(s):this._trySubscribe(s)),o.useDeprecatedSynchronousErrorHandling&&s.syncErrorThrowable&&(s.syncErrorThrowable=!1,s.syncErrorThrown))throw s.syncErrorValue;return s},r.prototype._trySubscribe=function(r){try{return this._subscribe(r)}catch(t){o.useDeprecatedSynchronousErrorHandling&&(r.syncErrorThrown=!0,r.syncErrorValue=t),!function(r){for(;r;){var t=r,n=t.closed,e=t.destination,o=t.isStopped;if(n||o)return!1;r=e&&e instanceof f?e:null}return!0}(r)?console.warn(t):r.error(t)}},r.prototype.forEach=function(r,t){var n=this;return new(t=E(t))(function(t,e){var o;o=n.subscribe(function(t){try{r(t)}catch(r){e(r),o&&o.unsubscribe()}},e,t)})},r.prototype._subscribe=function(r){var t=this.source;return t&&t.subscribe(r)},r.prototype[y]=function(){return this},r.prototype.pipe=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return 0===r.length?this:_(r)(this)},r.prototype.toPromise=function(r){var t=this;return new(r=E(r))(function(r,n){var e;t.subscribe(function(r){return e=r},function(r){return n(r)},function(){return r(e)})})},r.create=function(t){return new r(t)},r}();function E(r){if(r||(r=Promise),!r)throw new Error("no Promise impl found");return r}export{w as O};
