(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3677,9946],{62705:function(e,t,r){var n=r(55639).Symbol;e.exports=n},29932:function(e){e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length,o=Array(n);++r<n;)o[r]=t(e[r],r,e);return o}},44239:function(e,t,r){var n=r(62705),o=r(89607),s=r(2333),i=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):s(e)}},80531:function(e,t,r){var n=r(62705),o=r(29932),s=r(1469),i=r(33448),c=n?n.prototype:void 0,a=c?c.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(s(t))return o(t,e)+"";if(i(t))return a?a.call(t):"";var r=t+"";return"0"==r&&1/t==-Infinity?"-0":r}},31957:function(e,t,r){var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=n},89607:function(e,t,r){var n=r(62705),o=Object.prototype,s=o.hasOwnProperty,i=o.toString,c=n?n.toStringTag:void 0;e.exports=function(e){var t=s.call(e,c),r=e[c];try{e[c]=void 0;var n=!0}catch(a){}var o=i.call(e);return n&&(t?e[c]=r:delete e[c]),o}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},55639:function(e,t,r){var n=r(31957),o="object"==typeof self&&self&&self.Object===Object&&self,s=n||o||Function("return this")();e.exports=s},3522:function(e,t,r){var n=r(79833),o=/[\\^$.*+?()[\]{}|]/g,s=RegExp(o.source);e.exports=function(e){return(e=n(e))&&s.test(e)?e.replace(o,"\\$&"):e}},1469:function(e){var t=Array.isArray;e.exports=t},37005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},33448:function(e,t,r){var n=r(44239),o=r(37005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==n(e)}},79833:function(e,t,r){var n=r(80531);e.exports=function(e){return null==e?"":n(e)}},7880:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(3522),o=r.n(n);function s(e,t,{isGlobal:r=!1,ignoreSpaces:n=!1}){const{caseSensitive:s,regexMatch:i,wholeWord:c}=t;if(""===e)return new RegExp(e);let a=e;var u;n&&(a=/^\s{0,2}$/.test(u=a)?"(?!\\s*.*)":u),i||(a=o()(a)),a=function(e,t){return""!==e&&t?`\\b${e}\\b`:e}(a,c);const l=function(e,t){return e&&t?"g":!e&&t?"gi":e||t?void 0:"i"}(s,r);return l?new RegExp(a,l):new RegExp(a)}},39946:function(e,t,r){"use strict";r.r(t);var n=r(16663),o=r(7880);function s(e,t,r){if(!e||!t||!r)return[];const n=(0,o.Z)(e,r,{isGlobal:!0}),s=[],i=t.split("\n");for(let o=0;o<i.length;o++){let e;const t=i[o];for(;null!==(e=n.exec(t));){if(!e)throw new Error("no singleMatch");s.push({line:o,ch:e.index}),""===e[0]&&(n.unicode||console.warn("lastIndex++ can cause issues in unicode mode"),n.lastIndex++)}}return s}const i=/([ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g,c=new RegExp(["([ !@#$%^&*()_+-=[]{};':\"\\|,.<>/?])",'[^ !@#$%^&*()_+-=[]{};\':"\\|,.<>/?]*$"/'].join(""));self.onmessage=(0,n.workerHandler)({getMatches:s,findSourceMatches:function(e,t,r){if(""==r)return[];const n=t.value,o=n.split("\n");return s(r,n,{caseSensitive:!1,regexMatch:!1,wholeWord:!1}).map((({line:t,ch:n})=>{const{value:s,matchIndex:a}=function(e,t){if(e.length<100)return{matchIndex:t,value:e};const r=Math.max(t-40,0),n=e.slice(r,t+400);let o=n.search(i),s=n.search(c);o>t&&(o=-1);s<t&&(s=n.length);const a=n.slice(o+1,s);return{matchIndex:t-o-r-1,value:a}}(o[t],n);return{sourceId:e,line:t+1,column:n,matchIndex:a,match:r,value:s}}))}})},16663:function(e){function t(){this.msgId=1,this.worker=null}function r(e){return"object"===typeof e&&e&&"message"in e?{error:!0,message:e.message,metadata:e.metadata}:{error:!0,message:null==e?e:e.toString(),metadata:void 0}}t.prototype={start(e,t){this.worker=e(),this.worker.onerror=()=>{console.error(`Error in ${t} worker`)}},stop(){this.worker&&(this.worker.terminate(),this.worker=null)},task(e,{queue:t=!1}={}){const r=[],n=()=>{const t=r.slice();if(r.length=0,!this.worker)return;const n=this.msgId++;this.worker.postMessage({id:n,method:e,calls:t.map((e=>e[0]))});const o=({data:e})=>{e.id===n&&this.worker&&(this.worker.removeEventListener("message",o),e.results.forEach(((e,r)=>{const[,n,o]=t[r];if(e.error){const t=new Error(e.message);t.metadata=e.metadata,o(t)}else n(e.response)})))};this.worker.addEventListener("message",o)};return(...e)=>(e=>new Promise(((o,s)=>{t&&0===r.length&&Promise.resolve().then(n),r.push([e,o,s]),t||n()})))(e)},invoke(e,...t){return this.task(e)(...t)}},e.exports={WorkerDispatcher:t,workerHandler:function(e){return function(t){const{id:n,method:o,calls:s}=t.data;Promise.all(s.map((t=>{try{const n=e[o].apply(void 0,t);return n instanceof Promise?n.then((e=>({response:e})),(e=>r(e))):{response:n}}catch(n){return r(n)}}))).then((e=>{self.postMessage({id:n,results:e})}))}}}}},function(e){e.O(0,[9774,179],(function(){return t=39946,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
//# sourceMappingURL=searchWorker-ecfb3a7f4f6b9666.js.map