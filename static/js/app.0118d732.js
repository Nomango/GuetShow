(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,n,a){e.exports=a("cd49")},"0613":function(e,n,a){"use strict";var t=a("2b0e"),u=a("2f62"),c={userName:""},o={SET_USER_NAME:function(e,n){e.userName=n}},i={setUserName:function(e,n){var a=e.commit;a("SET_USER_NAME",n)}},s={state:c,mutations:o,actions:i};t["a"].use(u["a"]);n["a"]=new u["a"].Store({modules:{app:s}})},"5c0b":function(e,n,a){"use strict";a("6605")},6605:function(e,n,a){},b20f:function(e,n,a){},cd49:function(e,n,a){"use strict";a.r(n);a("e260"),a("e6cf"),a("cca6"),a("a79d");var t=a("2b0e"),u=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{attrs:{id:"app"}},[a("router-view",{staticClass:"view"})],1)},c=[],o={data:function(){return{transitionName:"fold-left"}},watch:{$route:function(e,n){console.log("asdfasd",e);var a=["/list","/detail"],t=a.indexOf(e.path),u=a.indexOf(n.path);console.log(t,u),this.transitionName=t>u?"fold-left":"fold-right"}}},i=o,s=(a("5c0b"),a("2877")),r=Object(s["a"])(i,u,c,!1,null,null,null),f=r.exports,d=(a("d3b7"),a("3ca3"),a("ddb0"),a("8c4f"));t["a"].use(d["a"]);var l=[{path:"/",name:"Home",component:function(){return Promise.all([a.e("chunk-09d63fdc"),a.e("chunk-65632682"),a.e("chunk-f44d3c94")]).then(a.bind(null,"0394"))}},{path:"/list",name:"List",component:function(){return Promise.all([a.e("chunk-09d63fdc"),a.e("chunk-1b759660")]).then(a.bind(null,"11fa"))}},{path:"/detail/:id",name:"Detail",component:function(){return Promise.all([a.e("chunk-09d63fdc"),a.e("chunk-6fadd792")]).then(a.bind(null,"78c2"))}}],p=new d["a"]({routes:l,scrollBehavior:function(e,n,a){return{y:0}}}),h=p,m=a("0613"),b=a("fe3c"),w=a.n(b),k=(a("499a"),a("b20f"),a("343b")),v=a("f0ca"),E=a("b650"),N=a("6b41"),_=a("9ed2"),S=a("ad06"),g=a("e41f"),x=a("f253");a("157a");t["a"].use(k["a"],{}),t["a"].use(v["a"]),t["a"].use(E["a"]),t["a"].use(N["a"]),t["a"].use(_["a"]),t["a"].use(S["a"]),t["a"].use(g["a"]),t["a"].use(x["a"]),w.a.attach(document.body),t["a"].config.productionTip=!1,new t["a"]({router:h,store:m["a"],render:function(e){return e(f)}}).$mount("#app")}},[[0,"runtime","chunk-libs"]]]);