(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4bfce6ee"],{"00294":function(t,e,n){},"0049":function(t,e,n){t.exports=n.p+"static/img/teacher.f0eca3ba.svg"},"1f87":function(t,e,n){t.exports=n.p+"static/img/price.fafc5b62.svg"},"307f":function(t,e,n){var a=n("6d9c"),i=n("ac34");t.exports=Object.keys||function(t){return a(t,i)}},"58a3":function(t,e,n){var a,i=n("755b"),s=n("ed3c"),r=n("ac34"),c=n("10c8"),o=n("8833"),l=n("b809"),u=n("96eb"),f=">",d="<",p="prototype",h="script",v=u("IE_PROTO"),m=function(){},_=function(t){return d+h+f+t+d+"/"+h+f},b=function(t){t.write(_("")),t.close();var e=t.parentWindow.Object;return t=null,e},g=function(){var t,e=l("iframe"),n="java"+h+":";return e.style.display="none",o.appendChild(e),e.src=String(n),t=e.contentWindow.document,t.open(),t.write(_("document.F=Object")),t.close(),t.F},C=function(){try{a=new ActiveXObject("htmlfile")}catch(e){}C="undefined"!=typeof document?document.domain&&a?b(a):g():b(a);var t=r.length;while(t--)delete C[p][r[t]];return C()};c[v]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(m[p]=i(t),n=new m,m[p]=null,n[v]=t):n=C(),void 0===e?n:s.f(n,e)}},6518:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return c}));var a=n("b32d");function i(t){return Object(a["a"])({url:"/api/work",method:"GET",params:t})}function s(t){return Object(a["a"])({url:"/api/school",method:"get",params:t})}function r(t){return Object(a["a"])({url:"/api/teacher",method:"get",params:t})}function c(t){return Object(a["a"])({url:"/api/work/"+t.id,method:"get"})}},6947:function(t,e,n){"use strict";n("00294")},"78c2":function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return h}));var a=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"detail-container"},[e("header",{staticClass:"detail-header"},[e("div",{staticClass:"detail-header-left",on:{click:t.handleonClickLeft}},[e("i",{staticClass:"van-icon van-icon-arrow-left van-nav-bar__arrow"})]),t._m(0)]),e("div",{staticClass:"detail-main"},[e("h2",{staticClass:"article-title"},[t._v(t._s(t.projectInfo.name))]),e("hr",{staticClass:"article-info-hr"}),e("div",{staticClass:"article-info"},[t.level?e("div",{staticClass:"article-info-item big"},[t._m(1),e("span",{staticClass:"article-info-text"},[t._v(t._s(t.level))])]):t._e(),e("br"),e("div",{staticClass:"article-info-item"},[t._m(2),e("span",{staticClass:"article-info-text"},[t._v(" "+t._s(t.studentName)+" ")])]),t.teachers?e("div",{staticClass:"article-info-item"},[t._m(3),e("span",{staticClass:"article-info-text"},[t._v(t._s(t.teachers))])]):t._e(),e("br"),e("div",{staticClass:"article-info-item"},[e("span",{staticClass:"article-info-text"},[t._v(t._s(t.projectInfo.school))]),e("span",{staticClass:"article-info-text"},[t._v(t._s(t.projectInfo.major)+"专业")])]),e("br"),t.phoneNumber?e("div",{staticClass:"article-info-item"},[e("span",{staticClass:"article-info-text"},[t._v(" 联系方式："),t.phoneNumber?e("a",{attrs:{href:"tel:"+t.phoneNumber}},[t._v(t._s(t.phoneNumber))]):t._e()])]):t._e(),t.studentEmail?e("div",{staticClass:"article-info-item"},[e("span",{staticClass:"article-info-text"},[t._v(" 联系方式： "),t.studentEmail?e("a",{attrs:{href:"mailto:"+t.studentEmail}},[t._v(" "+t._s(t.studentEmail)+" ")]):t._e()])]):t._e(),t.phoneNumber||t.studentEmail||!t.projectInfo.connect?t._e():e("div",{staticClass:"article-info-item"},[e("span",{staticClass:"article-info-text"},[t._v(" 联系方式："+t._s(t.projectInfo.connect)+" ")])])]),e("hr",{staticClass:"article-info-hr"}),e("div",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.detailContent)}})])])},i=[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"detail-header-right"},[e("img",{staticClass:"detail-header-logo",attrs:{src:"https://guetshow.oss-cn-shenzhen.aliyuncs.com/static/logo_compress.png",alt:""}})])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("span",{staticClass:"article-info-icon"},[e("img",{attrs:{src:n("1f87"),alt:""}})])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("span",{staticClass:"article-info-icon"},[e("img",{attrs:{src:n("d9a7"),alt:""}})])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("span",{staticClass:"article-info-icon"},[e("img",{attrs:{src:n("0049"),alt:""}})])}],s=(n("983b"),n("fd63")),r=n("3c3a"),c=n("6518"),o=n("1f2a");let l=class extends r["c"]{constructor(){super(...arguments),this.projectInfo={}}get studentName(){return this.projectInfo.student&&this.projectInfo.student.name||""}get level(){switch(this.projectInfo.level){case 1:return"一等奖";case 2:return"二等奖";case 3:return"三等奖"}return""}get phoneNumber(){return/^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.projectInfo.connect)?this.projectInfo.connect:""}get studentEmail(){return/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.projectInfo.connect)?this.projectInfo.connect:""}get teachers(){const t=this.projectInfo.teachers;return null!==t&&void 0!==t&&t.length?"导师："+t.join("、"):""}get detailContent(){return this.projectInfo.content||""}handleonClickLeft(){this.$router.replace({path:"/list"})}};l=Object(s["a"])([Object(r["a"])({beforeRouteEnter:async(t,e,n)=>{o["a"].$emit("toggleLoading",!0),Promise.allSettled([Object(c["a"])(),Object(c["d"])({id:Number(t.params.id)})]).then(t=>{const[{value:e},{value:a}]=t,{data:i}=e||{},{data:s}=a||{},r=((null===i||void 0===i?void 0:i.teachers)||[]).map(t=>((null===s||void 0===s?void 0:s.teachers)||[]).includes(t.id)?t.name:"");setTimeout(()=>{o["a"].$emit("toggleLoading"),n(t=>{t.projectInfo={...s||{},teachers:r.filter(Boolean)}})},200)}).catch(t=>{console.log(t)})}})],l);var u=l,f=u,d=(n("fb2b"),n("6947"),n("0b56")),p=Object(d["a"])(f,a,i,!1,null,"59083461",null),h=p.exports},8833:function(t,e,n){var a=n("ba6a");t.exports=a("document","documentElement")},"983b":function(t,e,n){"use strict";var a=n("50c8"),i=n("4e16").includes,s=n("b644"),r=n("b3ed"),c=s((function(){return!Array(1).includes()}));a({target:"Array",proto:!0,forced:c},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("includes")},b3ed:function(t,e,n){var a=n("6f72"),i=n("58a3"),s=n("31f1").f,r=a("unscopables"),c=Array.prototype;void 0==c[r]&&s(c,r,{configurable:!0,value:i(null)}),t.exports=function(t){c[r][t]=!0}},d9a7:function(t,e,n){t.exports=n.p+"static/img/people.7b26b342.svg"},e344:function(t,e,n){},ed3c:function(t,e,n){var a=n("d50f"),i=n("0834"),s=n("31f1"),r=n("755b"),c=n("8280"),o=n("307f");e.f=a&&!i?Object.defineProperties:function(t,e){r(t);var n,a=c(e),i=o(e),l=i.length,u=0;while(l>u)s.f(t,n=i[u++],a[n]);return t}},fb2b:function(t,e,n){"use strict";n("e344")}}]);