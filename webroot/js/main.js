!function(){"use strict";function e(e){var t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=e.substring(0,4),r=e.substring(5,7);r="0"===r.substring(0,1)?r.substring(1):r,r=t[parseInt(r,10)-1];var i=e.substring(8,10);return i="0"===i.substring(0,1)?i.substring(1):i,i+" "+r+" "+n}function t(e,t){var n=void 0;return function(){return e&&(n=e.apply(t||this,arguments),e=null),n}}function n(e,t,n){var r=void 0;return function(){var i=this,o=arguments,a=function(){r=null,n||e.apply(i,o)},s=n&&!r;clearTimeout(r),r=setTimeout(a,t),s&&e.apply(i,o)}}function r(e,t){var n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return n.open("GET",e),n.onreadystatechange=function(){n.readyState>3&&200===n.status&&t(n.responseText)},n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.send(),n}function i(n){"undefined"!=typeof n&&n.preventDefault();var i=this.querySelector(".js-grid-poster");if(!l){var o=i.querySelector("img"),a="undefined"!=typeof o.currentSrc?o.currentSrc:o.src;x.style.backgroundImage="url('"+a+"')",A.style.backgroundImage="url('"+a+"')",g.classList.add("movie-container--visible"),document.body.classList.add("no-scroll")}var s=_.getBoundingClientRect(),d=i.getBoundingClientRect(),u=1/(s.width/d.width),v=d.left-s.left,C=d.top-s.top;if(_.style.transform="translate("+v+"px, "+C+"px)",w.style.transform="scale("+u+")",l)_.classList.remove("movie--flipped"),p.style.opacity=0,_.addEventListener("transitionend",t(function(){i.style.opacity=1,g.classList.remove("movie-container--animate"),g.classList.remove("movie-container--visible"),document.body.classList.remove("no-scroll"),_.style.transform="none",w.style.transform="none",g.inert=!0,m.inert=!1,y.inert=!1,b.inert=!1,F.textContent="Save",O.innerHTML='<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>',D.disabled=!1,K&&K.focus()}));else{var T=3*(1/u);x.style.borderRadius=T+"px",S.style.borderRadius=T+"px",i.style.opacity=0,g.inert=!1,m.inert=!0,y.inert=!0,b.inert=!0;var z=n.target.closest("a").href;r(z,function(t){var n=JSON.parse(t);E.textContent=n.title,j.textContent=n.overview,L.textContent=e(n.release_date);var r="–";n.genres.length&&(r=n.genres.map(function(e){return c["x"+e]}).join(", ")),N.textContent=r;var i="–";n.cast&&n.cast.length&&(i=n.cast.join(", ")),k.textContent=i;var o="–";n.directors&&n.directors.length&&(o=n.directors.join(", ")),q.textContent=o;var a="–";n.runtime&&(a=n.runtime+" mins"),I.textContent=a,n.imdbId?(M.href="http://www.imdb.com/title/"+n.imdbId+"/",M.style.display="inline"):M.style.display="none",R.href="https://www.youtube.com/watch?v="+n.youtube_id,h={title:n.title,overview:n.overview,poster:n.poster,release_date:n.release_date,id:n.youtube_id},idbKeyval.get("fmoyt-saved").then(function(e){if(e&&"undefined"!=typeof e)for(var t=0;t<e.length;t++)if(e[t].id===n.youtube_id){F.textContent="Saved",O.innerHTML='<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',D.disabled=!0;break}}),D.setAttribute("data-title",n.title),D.setAttribute("data-id",n.youtube_id)}),window.requestAnimationFrame(function(){g.classList.add("movie-container--animate"),w.style.transform="none",_.style.transform="none",p.style.opacity=1,_.classList.add("movie--flipped")})}l=!l,f=this}function o(e,t,n,r){var i=document.createElement("li");i.classList.add("grid-item");var o=document.createElement("a");o.href="/"+e,o.classList.add("js-grid-item");var a=document.createElement("div");a.classList.add("grid-item__poster"),a.classList.add("js-grid-poster");var s=document.createElement("img");s.setAttribute("ix-src","https://fmoyt-10k.imgix.net"+t+"?w=320&amp;h=480&amp;fit=crop&amp;auto=format,compress"),s.alt="",s.setAttribute("sizes","170px"),s.classList.add("lazyload");var d=document.createElement("h3");d.textContent=n;var u=r.substring(0,4),c=document.createElement("time");return c.setAttribute("datetime",u),c.classList.add("mono"),c.textContent=u,a.appendChild(s),o.appendChild(a),o.appendChild(d),o.appendChild(c),i.appendChild(o),i}function a(){var e=null,t=void 0;for(t=0;t<T.length;t++){var n=T[t].getBoundingClientRect().top;if(null!==e&&n!==e)break;e=n}return t}function s(e){for(var t=0;e=e.previousElementSibling;t++);return t}var d=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();!function(e){function t(e,n,r){if(e.nodeType==Node.ELEMENT_NODE){var i=e;n&&n(i);var o=i.shadowRoot||i.webkitShadowRoot;if(o)return void t(o,n,o);if("content"==i.localName){for(var a=i,s=a.getDistributedNodes?a.getDistributedNodes():[],d=0;d<s.length;d++)t(s[d],n,r);return}if("slot"==i.localName){for(var u=i,c=u.assignedNodes?u.assignedNodes({flatten:!0}):[],l=0;l<c.length;l++)t(c[l],n,r);return}}for(var v=e.firstChild;null!=v;)t(v,n,r),v=v.nextSibling}function n(t){if(!t.querySelector("style#inert-style")){var n=e.createElement("style");n.setAttribute("id","inert-style"),n.textContent="\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n",t.appendChild(n)}}var r=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]"].join(","),i=function(){function n(e,t){d(this,n),this._inertManager=t,this._rootElement=e,this._managedNodes=new Set([]),this._rootElement.setAttribute("aria-hidden","true"),this._makeSubtreeUnfocusable(this._rootElement),this._observer=new MutationObserver(this._onMutation.bind(this)),this._observer.observe(this._rootElement,{attributes:!0,childList:!0,subtree:!0})}return u(n,[{key:"destructor",value:function(){this._observer.disconnect(),this._observer=null,this._rootElement&&this._rootElement.removeAttribute("aria-hidden"),this._rootElement=null;var e=!0,t=!1,n=void 0;try{for(var r,i=this._managedNodes[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value;this._unmanageNode(o.node)}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}this._managedNodes=null,this._inertManager=null}},{key:"_makeSubtreeUnfocusable",value:function(n){var r=this;t(n,function(e){r._visitNode(e)});var i=e.activeElement;if(!e.contains(n)){for(var o=n,a=void 0;o;){if(o.nodeType===Node.DOCUMENT_FRAGMENT_NODE){a=o;break}o=o.parentNode}a&&(i=a.activeElement)}n.contains(i)&&i.blur()}},{key:"_visitNode",value:function(e){e.nodeType===Node.ELEMENT_NODE&&(e!==this._rootElement&&e.hasAttribute("inert")&&this._adoptInertRoot(e),(e.matches(r)||e.hasAttribute("tabindex"))&&this._manageNode(e))}},{key:"_manageNode",value:function(e){var t=this._inertManager.register(e,this);this._managedNodes.add(t)}},{key:"_unmanageNode",value:function(e){var t=this._inertManager.deregister(e,this);t&&this._managedNodes.delete(t)}},{key:"_unmanageSubtree",value:function(e){var n=this;t(e,function(e){n._unmanageNode(e)})}},{key:"_adoptInertRoot",value:function(e){var t=this._inertManager.getInertRoot(e);t||(this._inertManager.setInert(e,!0),t=this._inertManager.getInertRoot(e));var n=!0,r=!1,i=void 0;try{for(var o,a=t.managedNodes[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;this._manageNode(s.node)}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}},{key:"_onMutation",value:function(e,t){var n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value,d=s.target;if("childList"===s.type){var u=!0,c=!1,l=void 0;try{for(var v,f=Array.from(s.addedNodes)[Symbol.iterator]();!(u=(v=f.next()).done);u=!0){var h=v.value;this._makeSubtreeUnfocusable(h)}}catch(e){c=!0,l=e}finally{try{!u&&f.return&&f.return()}finally{if(c)throw l}}var m=!0,y=!1,b=void 0;try{for(var g,p=Array.from(s.removedNodes)[Symbol.iterator]();!(m=(g=p.next()).done);m=!0){var _=g.value;this._unmanageSubtree(_)}}catch(e){y=!0,b=e}finally{try{!m&&p.return&&p.return()}finally{if(y)throw b}}}else if("attributes"===s.type)if("tabindex"===s.attributeName)this._manageNode(d);else if(d!==this._rootElement&&"inert"===s.attributeName&&d.hasAttribute("inert")){this._adoptInertRoot(d);var w=this._inertManager.getInertRoot(d),x=!0,S=!1,A=void 0;try{for(var E,j=this._managedNodes[Symbol.iterator]();!(x=(E=j.next()).done);x=!0){var L=E.value;d.contains(L.node)&&w._manageNode(L.node)}}catch(e){S=!0,A=e}finally{try{!x&&j.return&&j.return()}finally{if(S)throw A}}}}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}},{key:"managedNodes",get:function(){return new Set(this._managedNodes)}}]),n}(),o=function(){function e(t,n){d(this,e),this._node=t,this._overrodeFocusMethod=!1,this._inertRoots=new Set([n]),this._destroyed=!1,this.ensureUntabbable()}return u(e,[{key:"destructor",value:function(){this._throwIfDestroyed(),this._node&&(this.hasSavedTabIndex?this._node.setAttribute("tabindex",this.savedTabIndex):this._node.removeAttribute("tabindex"),this._overrodeFocusMethod&&delete this._node.focus),this._node=null,this._inertRoots=null,this._destroyed=!0}},{key:"_throwIfDestroyed",value:function(){if(this.destroyed)throw new Error("Trying to access destroyed InertNode")}},{key:"ensureUntabbable",value:function(){var e=this.node;if(e.matches(r)){if(e.tabIndex===-1&&this.hasSavedTabIndex)return;e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex),e.setAttribute("tabindex","-1"),e.nodeType===Node.ELEMENT_NODE&&(e.focus=function(){},this._overrodeFocusMethod=!0)}else e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex,e.removeAttribute("tabindex"))}},{key:"addInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.add(e)}},{key:"removeInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.delete(e),0===this._inertRoots.size&&this.destructor()}},{key:"destroyed",get:function(){return this._destroyed}},{key:"hasSavedTabIndex",get:function(){return"_savedTabIndex"in this}},{key:"node",get:function(){return this._throwIfDestroyed(),this._node}},{key:"savedTabIndex",set:function(e){this._throwIfDestroyed(),this._savedTabIndex=e},get:function(){return this._throwIfDestroyed(),this._savedTabIndex}}]),e}(),a=function(){function e(t){if(d(this,e),!t)throw new Error("Missing required argument; InertManager needs to wrap a document.");this._document=t,this._managedNodes=new Map,this._inertRoots=new Map,this._observer=new MutationObserver(this._watchForInert.bind(this)),n(t.head||t.body||t.documentElement),"loading"===t.readyState?t.addEventListener("DOMContentLoaded",this._onDocumentLoaded.bind(this)):this._onDocumentLoaded()}return u(e,[{key:"setInert",value:function(e,t){if(t){if(this._inertRoots.has(e))return;var r=new i(e,this);if(e.setAttribute("inert",""),this._inertRoots.set(e,r),!this._document.body.contains(e))for(var o=e.parentNode;o;)11===o.nodeType&&n(o),o=o.parentNode}else{if(!this._inertRoots.has(e))return;var a=this._inertRoots.get(e);a.destructor(),this._inertRoots.delete(e),e.removeAttribute("inert")}}},{key:"getInertRoot",value:function(e){return this._inertRoots.get(e)}},{key:"register",value:function(e,t){var n=this._managedNodes.get(e);return void 0!==n?(n.addInertRoot(t),n.ensureUntabbable()):n=new o(e,t),this._managedNodes.set(e,n),n}},{key:"deregister",value:function(e,t){var n=this._managedNodes.get(e);return n?(n.removeInertRoot(t),n.destroyed&&this._managedNodes.delete(e),n):null}},{key:"_onDocumentLoaded",value:function(){var e=Array.from(this._document.querySelectorAll("[inert]")),t=!0,n=!1,r=void 0;try{for(var i,o=e[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var a=i.value;this.setInert(a,!0)}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}this._observer.observe(this._document.body,{attributes:!0,subtree:!0,childList:!0})}},{key:"_watchForInert",value:function(e,t){var n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;switch(s.type){case"childList":var d=!0,u=!1,c=void 0;try{for(var l,v=Array.from(s.addedNodes)[Symbol.iterator]();!(d=(l=v.next()).done);d=!0){var f=l.value;if(f.nodeType===Node.ELEMENT_NODE){var h=Array.from(f.querySelectorAll("[inert]"));f.matches("[inert]")&&h.unshift(f);var m=!0,y=!1,b=void 0;try{for(var g,p=h[Symbol.iterator]();!(m=(g=p.next()).done);m=!0){var _=g.value;this.setInert(_,!0)}}catch(e){y=!0,b=e}finally{try{!m&&p.return&&p.return()}finally{if(y)throw b}}}}}catch(e){u=!0,c=e}finally{try{!d&&v.return&&v.return()}finally{if(u)throw c}}break;case"attributes":if("inert"!==s.attributeName)continue;var w=s.target,x=w.hasAttribute("inert");this.setInert(w,x)}}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}}]),e}(),s=new a(e);Object.defineProperty(Element.prototype,"inert",{enumerable:!0,get:function(){return this.hasAttribute("inert")},set:function(e){s.setInert(this,e)}})}(document),function(){function e(){return n||(n=new Promise(function(e,t){var n=indexedDB.open("keyval-store",1);n.onerror=function(){t(n.error)},n.onupgradeneeded=function(){n.result.createObjectStore("keyval")},n.onsuccess=function(){e(n.result)}})),n}function t(t,n){return e().then(function(e){return new Promise(function(r,i){var o=e.transaction("keyval",t);o.oncomplete=function(){r()},o.onerror=function(){i(o.error)},n(o.objectStore("keyval"))})})}var n,r={get:function(e){var n;return t("readonly",function(t){n=t.get(e)}).then(function(){return n.result})},set:function(e,n){return t("readwrite",function(t){t.put(n,e)})},delete:function(e){return t("readwrite",function(t){t.delete(e)})},clear:function(){return t("readwrite",function(e){e.clear()})},keys:function e(){var e=[];return t("readonly",function(t){(t.openKeyCursor||t.openCursor).call(t).onsuccess=function(){this.result&&(e.push(this.result.key),this.result.continue())}}).then(function(){return e})}};"undefined"!=typeof module&&module.exports?module.exports=r:self.idbKeyval=r}();var c={x28:"Action",x12:"Adventure",x16:"Animation",x35:"Comedy",x80:"Crime",x99:"Documentary",x18:"Drama",x10751:"Family",x14:"Fantasy",x36:"History",x27:"Horror",x10402:"Music",x9648:"Mystery",x10749:"Romance",x878:"Science Fiction",x10770:"TV Movie",x53:"Thriller",x10752:"War",x37:"Western"},l=!1,v=!1,f=null,h=null,m=document.querySelector(".js-main"),y=document.querySelector(".js-header"),b=document.querySelector(".js-footer"),g=document.querySelector(".js-movie-container"),p=document.querySelector(".js-movie-container-bg"),_=document.querySelector(".js-movie"),w=document.querySelector(".js-movie-inner"),x=document.querySelector(".js-movie-front"),S=document.querySelector(".js-movie-back"),A=document.querySelector(".js-movie-back-poster"),E=document.querySelector(".js-movie-title"),j=document.querySelector(".js-movie-overview"),L=document.querySelector(".js-movie-release-date"),N=document.querySelector(".js-movie-genre"),k=document.querySelector(".js-movie-starring"),q=document.querySelector(".js-movie-director"),I=document.querySelector(".js-movie-runtime"),M=document.querySelector(".js-imdb"),R=document.querySelector(".js-movie-link"),C=document.querySelector(".js-grid"),T=document.querySelectorAll(".js-grid-item"),D=document.querySelector(".js-save"),F=document.querySelector(".js-save .btn__text"),O=document.querySelector(".js-save .btn__icon"),z=0,H=document.querySelector(".js-watch"),B=document.querySelector(".js-iframe"),K=null,U=38,X=39,J=40,P=37,V=27;g.classList.contains("movie-container--single")||(g.inert=!0),H.inert=!0,C&&(window.addEventListener("click",function(e){var t=e.target.closest(".js-grid-item");t&&(e.preventDefault(),i.bind(t,e)())}),C.addEventListener("focus",function(e){K=e.target.closest(".js-grid-item")},!0)),p.addEventListener("click",function(){i.bind(f)()}),document.querySelector(".js-close-movie").addEventListener("click",function(){i.bind(f)()});var W=document.querySelector(".js-load-more");W&&W.addEventListener("click",function(e){e.preventDefault();var t=e.target.closest("a"),n=t.href,i=n.match(/[0-9]+$/);i=parseInt(i[0],10),t.href="/page/"+(i+1),t.setAttribute("disabled","disabled"),20===i&&(t.style.display="none"),r(n,function(e){for(var n=JSON.parse(e),r=document.createDocumentFragment(),i=0;i<n.length;i++){var a=o(n[i].youtube_id,n[i].poster,n[i].title,n[i].release_date);r.appendChild(a)}C.appendChild(r),t.removeAttribute("disabled"),requestAnimationFrame(function(){T=document.querySelectorAll(".js-grid-item"),imgix.init({srcAttribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes"})})})});var G=a();window.addEventListener("resize",n(function(){G=a()},250)),document.addEventListener("keydown",function(e){if(e.which===U||e.which===X||e.which===J||e.which===P){var t=document.activeElement;if(!t.closest(".grid-item"))return void T[0].focus();var n=s(t.closest(".grid-item")),r=void 0;e.which===P&&(r=n-1),e.which===X&&(r=n+1),e.which===J&&(r=n+G),e.which===U&&(r=n-G),r>=0&&r<T.length&&T[r].focus()}}),document.addEventListener("keydown",function(e){return e.which===V&&v?(v=!1,H.classList.remove("watch--active"),void H.addEventListener("transitionend",t(function(){B.src="",H.inert=!0,g.inert=!1}))):void(e.which===V&&l&&i.bind(f)())}),D.style.display="inline-block",D.addEventListener("click",function(e){e.target.closest(".js-save");idbKeyval.get("fmoyt-saved").then(function(e){var t=void 0;t="undefined"==typeof e?[]:e.slice(0),t.push(h),idbKeyval.set("fmoyt-saved",t).then(function(e){return console.log("saved")}),F.textContent="Saved",O.innerHTML='<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',D.disabled=!0;var n=o(h.id,h.poster,h.title,h.release_date);document.querySelector(".js-saved-grid").appendChild(n),z++,document.querySelector(".js-saved-tab").textContent="Saved ("+z+")",requestAnimationFrame(function(){T=document.querySelectorAll(".js-grid-item"),imgix.init({srcAttribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes"})})})});var $=document.querySelector(".js-tablist");idbKeyval.get("fmoyt-saved").then(function(e){e&&"undefined"!=typeof e&&(z=e.length),$.innerHTML='<ul role="tablist">\n      <li role="presentation">\n        <a class="js-tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>\n      </li>\n      <li role="presentation">\n        <a class="js-tab js-saved-tab" href="#saved" role="tab" aria-controls="saved">Saved ('+z+")</a>\n      </li>\n    </ul>"}),window.addEventListener("click",function(e){if(e.target.closest(".js-tab")){e.preventDefault();for(var t=document.querySelectorAll(".js-tab"),n=document.querySelectorAll('[role="tabpanel"]'),r=0;r<t.length;r++)t[r].removeAttribute("aria-selected");e.target.closest(".js-tab").setAttribute("aria-selected","true");for(var i=0;i<n.length;i++)n[i].setAttribute("aria-hidden","true");document.querySelector(e.target.closest(".js-tab").getAttribute("href")).removeAttribute("aria-hidden")}}),idbKeyval.get("fmoyt-saved").then(function(e){if(e){for(var t=document.createDocumentFragment(),n=0;n<e.length;n++){var r=o(e[n].id,e[n].poster,e[n].title,e[n].release_date);t.appendChild(r)}document.querySelector(".js-saved-grid").appendChild(t),requestAnimationFrame(function(){T=document.querySelectorAll(".js-grid-item"),imgix.init({srcAttribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes"})})}}),R.addEventListener("click",function(e){e.preventDefault(),H.inert=!1,g.inert=!0,v=!0,H.classList.add("watch--active"),H.addEventListener("transitionend",t(function(){B.src="https://www.youtube.com/embed/"+h.id+"?autoplay=1"}))}),document.querySelector(".js-close-watch").addEventListener("click",function(){v=!1,H.classList.remove("watch--active"),H.addEventListener("transitionend",t(function(){B.src="",H.inert=!0,g.inert=!1}))})}();
//# sourceMappingURL=main.js.map
