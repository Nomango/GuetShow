(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e491926"],{"159b":function(t,e,r){var n=r("da84"),a=r("fdbc"),o=r("17c2"),c=r("9112");for(var i in a){var u=n[i],s=u&&u.prototype;if(s&&s.forEach!==o)try{c(s,"forEach",o)}catch(f){s.forEach=o}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,a=r("a640"),o=a("forEach");t.exports=o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),o=r("2d00"),c=a("species");t.exports=function(t){return o>=51||!n((function(){var e=[],r=e.constructor={};return r[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"1dea":function(t,e,r){},2532:function(t,e,r){"use strict";var n=r("23e7"),a=r("5a34"),o=r("1d80"),c=r("ab13");n({target:"String",proto:!0,forced:!c("includes")},{includes:function(t){return!!~String(o(this)).indexOf(a(t),arguments.length>1?arguments[1]:void 0)}})},3835:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return u}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");function a(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,o=[],c=!0,i=!1;try{for(r=r.call(t);!(c=(n=r.next()).done);c=!0)if(o.push(n.value),e&&o.length===e)break}catch(u){i=!0,a=u}finally{try{c||null==r["return"]||r["return"]()}finally{if(i)throw a}}return o}}r("fb6a"),r("b0c0"),r("a630");function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function c(t,e){if(t){if("string"===typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){return n(t)||a(t,e)||c(t,e)||i()}},"44e7":function(t,e,r){var n=r("861d"),a=r("c6b6"),o=r("b622"),c=o("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==a(t))}},"4de4":function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").filter,o=r("1dde"),c=o("filter");n({target:"Array",proto:!0,forced:!c},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"4df4":function(t,e,r){"use strict";var n=r("0366"),a=r("7b0b"),o=r("9bdd"),c=r("e95a"),i=r("50c4"),u=r("8418"),s=r("35a1");t.exports=function(t){var e,r,f,l,d,b,p=a(t),v="function"==typeof this?this:Array,h=arguments.length,g=h>1?arguments[1]:void 0,m=void 0!==g,y=s(p),j=0;if(m&&(g=n(g,h>2?arguments[2]:void 0,2)),void 0==y||v==Array&&c(y))for(e=i(p.length),r=new v(e);e>j;j++)b=m?g(p[j],j):p[j],u(r,j,b);else for(l=y.call(p),d=l.next,r=new v;!(f=d.call(l)).done;j++)b=m?o(l,g,[f.value,j],!0):f.value,u(r,j,b);return r.length=j,r}},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("b64b"),r("a4d3"),r("4de4"),r("e439"),r("159b"),r("dbb4");var n=r("ade3");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),a=r("5899"),o="["+a+"]",c=RegExp("^"+o+o+"*"),i=RegExp(o+o+"*$"),u=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(c,"")),2&t&&(r=r.replace(i,"")),r}};t.exports={start:u(1),end:u(2),trim:u(3)}},"5a34":function(t,e,r){var n=r("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},6518:function(t,e,r){"use strict";r.d(e,"c",(function(){return a})),r.d(e,"b",(function(){return o})),r.d(e,"a",(function(){return c})),r.d(e,"d",(function(){return i}));var n=r("b32d");function a(t){return Object(n["a"])({url:"/api/work",method:"GET",params:t})}function o(t){return Object(n["a"])({url:"/api/school",method:"get",params:t})}function c(t){return Object(n["a"])({url:"/api/teacher",method:"get",params:t})}function i(t){return Object(n["a"])({url:"/api/work/".concat(t.id),method:"get"})}},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var o,c;return a&&"function"==typeof(o=e.constructor)&&o!==r&&n(c=o.prototype)&&c!==r.prototype&&a(t,c),t}},"78c2":function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return j}));var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"detail-container"},[r("van-nav-bar",{attrs:{fixed:"","left-arrow":"",title:t.projectInfo.name},on:{"click-left":t.handleonClickLeft}}),r("div",{staticClass:"detail-main"},[r("div",{staticClass:"article-info"},[r("div",{staticClass:"article-info-item"},[t._m(0),r("span",{staticClass:"article-info-text"},[t._v(" "+t._s(t.studentName)+" ")])]),t.teachers?r("div",{staticClass:"article-info-item"},[t._m(1),r("span",{staticClass:"article-info-text"},[t._v(t._s(t.teachers))])]):t._e()]),r("div",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.detailContent)}})])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"article-info-icon"},[n("img",{attrs:{src:r("d9a7"),alt:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"article-info-icon"},[n("img",{attrs:{src:r("d9a7"),alt:""}})])}],o=r("5530"),c=r("3835"),i=r("1da1"),u=r("d4ec"),s=r("bee2"),f=r("262e"),l=r("2caf"),d=(r("96cf"),r("b0c0"),r("a15b"),r("d3b7"),r("820e"),r("3ca3"),r("ddb0"),r("a9e3"),r("d81d"),r("caad"),r("2532"),r("4de4"),r("9ab4")),b=r("1b40"),p=r("6518"),v=function(t){Object(f["a"])(r,t);var e=Object(l["a"])(r);function r(){var t;return Object(u["a"])(this,r),t=e.apply(this,arguments),t.projectInfo={},t.loading=!0,t}return Object(s["a"])(r,[{key:"studentName",get:function(){return this.projectInfo.student&&this.projectInfo.student.name||""}},{key:"teachers",get:function(){var t=this.projectInfo.teachers;return null!==t&&void 0!==t&&t.length?"导师："+t.join("、"):""}},{key:"detailContent",get:function(){return this.projectInfo.content||""}},{key:"handleonClickLeft",value:function(){this.$router.go(-1)}}]),r}(b["c"]);v=Object(d["a"])([Object(b["a"])({beforeRouteEnter:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,r,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:Promise.allSettled([Object(p["a"])(),Object(p["d"])({id:Number(e.params.id)})]).then((function(t){var e=Object(c["a"])(t,2),r=e[0].value,a=e[1].value,i=r||{},u=i.data,s=a||{},f=s.data,l=((null===u||void 0===u?void 0:u.teachers)||[]).map((function(t){return((null===f||void 0===f?void 0:f.teachers)||[]).includes(t.id)?t.name:""}));n((function(t){t.loading=!1,t.projectInfo=Object(o["a"])(Object(o["a"])({},f||{}),{},{teachers:l.filter(Boolean)})}))})).catch((function(){n()}));case 1:case"end":return t.stop()}}),t)})));function e(e,r,n){return t.apply(this,arguments)}return e}()})],v);var h=v,g=h,m=(r("a69a"),r("a1a1"),r("2877")),y=Object(m["a"])(g,n,a,!1,null,"0bbfd55c",null),j=y.exports},"820e":function(t,e,r){"use strict";var n=r("23e7"),a=r("1c0b"),o=r("f069"),c=r("e667"),i=r("2266");n({target:"Promise",stat:!0},{allSettled:function(t){var e=this,r=o.f(e),n=r.resolve,u=r.reject,s=c((function(){var r=a(e.resolve),o=[],c=0,u=1;i(t,(function(t){var a=c++,i=!1;o.push(void 0),u++,r.call(e,t).then((function(t){i||(i=!0,o[a]={status:"fulfilled",value:t},--u||n(o))}),(function(t){i||(i=!0,o[a]={status:"rejected",reason:t},--u||n(o))}))})),--u||n(o)}));return s.error&&u(s.value),r.promise}})},8418:function(t,e,r){"use strict";var n=r("c04e"),a=r("9bf2"),o=r("5c6c");t.exports=function(t,e,r){var c=n(e);c in t?a.f(t,c,o(0,r)):t[c]=r}},"9bdd":function(t,e,r){var n=r("825a"),a=r("2a62");t.exports=function(t,e,r,o){try{return o?e(n(r)[0],r[1]):e(r)}catch(c){throw a(t),c}}},a15b:function(t,e,r){"use strict";var n=r("23e7"),a=r("44ad"),o=r("fc6a"),c=r("a640"),i=[].join,u=a!=Object,s=c("join",",");n({target:"Array",proto:!0,forced:u||!s},{join:function(t){return i.call(o(this),void 0===t?",":t)}})},a1a1:function(t,e,r){"use strict";r("1dea")},a630:function(t,e,r){var n=r("23e7"),a=r("4df4"),o=r("1c7e"),c=!o((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:c},{from:a})},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},a69a:function(t,e,r){"use strict";r("caac")},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),o=r("94ca"),c=r("6eeb"),i=r("5135"),u=r("c6b6"),s=r("7156"),f=r("c04e"),l=r("d039"),d=r("7c73"),b=r("241c").f,p=r("06cf").f,v=r("9bf2").f,h=r("58a8").trim,g="Number",m=a[g],y=m.prototype,j=u(d(y))==g,O=function(t){var e,r,n,a,o,c,i,u,s=f(t,!1);if("string"==typeof s&&s.length>2)if(s=h(s),e=s.charCodeAt(0),43===e||45===e){if(r=s.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(s.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+s}for(o=s.slice(2),c=o.length,i=0;i<c;i++)if(u=o.charCodeAt(i),u<48||u>a)return NaN;return parseInt(o,n)}return+s};if(o(g,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var w,E=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof E&&(j?l((function(){y.valueOf.call(r)})):u(r)!=g)?s(new m(O(e)),r,E):O(e)},A=n?b(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),I=0;A.length>I;I++)i(m,w=A[I])&&!i(E,w)&&v(E,w,p(m,w));E.prototype=y,y.constructor=E,c(a,g,E)}},ab13:function(t,e,r){var n=r("b622"),a=n("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[a]=!1,"/./"[t](e)}catch(n){}}return!1}},ade3:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},b0c0:function(t,e,r){var n=r("83ab"),a=r("9bf2").f,o=Function.prototype,c=o.toString,i=/^\s*function ([^ (]*)/,u="name";n&&!(u in o)&&a(o,u,{configurable:!0,get:function(){try{return c.call(this).match(i)[1]}catch(t){return""}}})},b32d:function(t,e,r){"use strict";r("d3b7");var n=r("bc3a"),a=r.n(n),o=r("0613"),c=r("d399"),i=a.a.create({baseURL:"http://47.102.102.16:8080",withCredentials:!0,timeout:3e4});i.interceptors.request.use((function(t){return o["a"].getters.token&&(t.headers["X-Token"]=""),t}),(function(t){return Promise.reject(t)})),i.interceptors.response.use((function(t){var e=t.data;return 0!==(null===e||void 0===e?void 0:e.code)?(Object(c["a"])({type:"fail",message:e.message,duration:3e3}),401===e.status&&o["a"].dispatch("user/resetToken").then((function(){location.reload()})),Promise.reject(new Error(e.message||"Error"))):Promise.resolve(e)}),(function(t){return Object(c["a"])({message:t.message,type:"fail",duration:3e3}),Promise.reject(t)})),e["a"]=i},b64b:function(t,e,r){var n=r("23e7"),a=r("7b0b"),o=r("df75"),c=r("d039"),i=c((function(){o(1)}));n({target:"Object",stat:!0,forced:i},{keys:function(t){return o(a(t))}})},caac:function(t,e,r){},caad:function(t,e,r){"use strict";var n=r("23e7"),a=r("4d64").includes,o=r("44d2");n({target:"Array",proto:!0},{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,o=r("1dde"),c=o("map");n({target:"Array",proto:!0,forced:!c},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},d9a7:function(t,e,r){t.exports=r.p+"static/img/people.7b26b342.svg"},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),o=r("56ef"),c=r("fc6a"),i=r("06cf"),u=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,r,n=c(t),a=i.f,s=o(n),f={},l=0;while(s.length>l)r=a(n,e=s[l++]),void 0!==r&&u(f,e,r);return f}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),o=r("fc6a"),c=r("06cf").f,i=r("83ab"),u=a((function(){c(1)})),s=!i||u;n({target:"Object",stat:!0,forced:s,sham:!i},{getOwnPropertyDescriptor:function(t,e){return c(o(t),e)}})},fb6a:function(t,e,r){"use strict";var n=r("23e7"),a=r("861d"),o=r("e8b5"),c=r("23cb"),i=r("50c4"),u=r("fc6a"),s=r("8418"),f=r("b622"),l=r("1dde"),d=l("slice"),b=f("species"),p=[].slice,v=Math.max;n({target:"Array",proto:!0,forced:!d},{slice:function(t,e){var r,n,f,l=u(this),d=i(l.length),h=c(t,d),g=c(void 0===e?d:e,d);if(o(l)&&(r=l.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?a(r)&&(r=r[b],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return p.call(l,h,g);for(n=new(void 0===r?Array:r)(v(g-h,0)),f=0;h<g;h++,f++)h in l&&s(n,f,l[h]);return n.length=f,n}})}}]);