!function(){"use strict";function e(e,t){var n=void 0;return function(){return e&&(n=e.apply(t||this,arguments),e=null),n}}function t(t){"undefined"!=typeof t&&t.preventDefault();var n=this.querySelector(".js-grid-poster");if(!a){var r=n.querySelector("img"),i="undefined"!=typeof r.currentSrc?r.currentSrc:r.src;f.style.backgroundImage="url('"+i+"')",y.style.backgroundImage="url('"+i+"')",u.classList.add("movie-container--visible")}var o=c.getBoundingClientRect(),m=n.getBoundingClientRect(),_=1/(o.width/m.width),g=m.left-o.left,w=m.top-o.top;if(c.style.transform="translate("+g+"px, "+w+"px)",h.style.transform="scale("+_+")",a)c.classList.remove("movie--flipped"),l.style.opacity=0,c.addEventListener("transitionend",e(function(){n.style.opacity=1,u.classList.remove("movie-container--animate"),u.classList.remove("movie-container--visible"),c.style.transform="none",h.style.transform="none",u.inert=!0,d.inert=!1,b&&b.focus()}));else{var N=3*(1/_);f.style.borderRadius=N+"px",v.style.borderRadius=N+"px",n.style.opacity=0,u.inert=!1,d.inert=!0,window.requestAnimationFrame(function(){u.classList.add("movie-container--animate"),h.style.transform="none",c.style.transform="none",l.style.opacity=1,c.classList.add("movie--flipped")})}a=!a,s=this}function n(e){b=e.target.closest(".js-grid-item")}function r(e){for(var t=0;e=e.previousElementSibling;t++);return t}var i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();!function(e){function t(e,n,r){if(e.nodeType==Node.ELEMENT_NODE){var i=e;n&&n(i);var o=i.shadowRoot||i.webkitShadowRoot;if(o)return void t(o,n,o);if("content"==i.localName){for(var a=i,s=a.getDistributedNodes?a.getDistributedNodes():[],d=0;d<s.length;d++)t(s[d],n,r);return}if("slot"==i.localName){for(var u=i,l=u.assignedNodes?u.assignedNodes({flatten:!0}):[],c=0;c<l.length;c++)t(l[c],n,r);return}}for(var h=e.firstChild;null!=h;)t(h,n,r),h=h.nextSibling}function n(t){if(!t.querySelector("style#inert-style")){var n=e.createElement("style");n.setAttribute("id","inert-style"),n.textContent="\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n",t.appendChild(n)}}var r=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]"].join(","),a=function(){function n(e,t){i(this,n),this._inertManager=t,this._rootElement=e,this._managedNodes=new Set([]),this._rootElement.setAttribute("aria-hidden","true"),this._makeSubtreeUnfocusable(this._rootElement),this._observer=new MutationObserver(this._onMutation.bind(this)),this._observer.observe(this._rootElement,{attributes:!0,childList:!0,subtree:!0})}return o(n,[{key:"destructor",value:function(){this._observer.disconnect(),this._observer=null,this._rootElement&&this._rootElement.removeAttribute("aria-hidden"),this._rootElement=null;var e=!0,t=!1,n=void 0;try{for(var r,i=this._managedNodes[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value;this._unmanageNode(o.node)}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}this._managedNodes=null,this._inertManager=null}},{key:"_makeSubtreeUnfocusable",value:function(n){var r=this;t(n,function(e){r._visitNode(e)});var i=e.activeElement;if(!e.contains(n)){for(var o=n,a=void 0;o;){if(o.nodeType===Node.DOCUMENT_FRAGMENT_NODE){a=o;break}o=o.parentNode}a&&(i=a.activeElement)}n.contains(i)&&i.blur()}},{key:"_visitNode",value:function(e){e.nodeType===Node.ELEMENT_NODE&&(e!==this._rootElement&&e.hasAttribute("inert")&&this._adoptInertRoot(e),(e.matches(r)||e.hasAttribute("tabindex"))&&this._manageNode(e))}},{key:"_manageNode",value:function(e){var t=this._inertManager.register(e,this);this._managedNodes.add(t)}},{key:"_unmanageNode",value:function(e){var t=this._inertManager.deregister(e,this);t&&this._managedNodes.delete(t)}},{key:"_unmanageSubtree",value:function(e){var n=this;t(e,function(e){n._unmanageNode(e)})}},{key:"_adoptInertRoot",value:function(e){var t=this._inertManager.getInertRoot(e);t||(this._inertManager.setInert(e,!0),t=this._inertManager.getInertRoot(e));var n=!0,r=!1,i=void 0;try{for(var o,a=t.managedNodes[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;this._manageNode(s.node)}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}},{key:"_onMutation",value:function(e,t){var n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value,d=s.target;if("childList"===s.type){var u=!0,l=!1,c=void 0;try{for(var h,f=Array.from(s.addedNodes)[Symbol.iterator]();!(u=(h=f.next()).done);u=!0){var v=h.value;this._makeSubtreeUnfocusable(v)}}catch(e){l=!0,c=e}finally{try{!u&&f.return&&f.return()}finally{if(l)throw c}}var y=!0,m=!1,b=void 0;try{for(var _,g=Array.from(s.removedNodes)[Symbol.iterator]();!(y=(_=g.next()).done);y=!0){var w=_.value;this._unmanageSubtree(w)}}catch(e){m=!0,b=e}finally{try{!y&&g.return&&g.return()}finally{if(m)throw b}}}else if("attributes"===s.type)if("tabindex"===s.attributeName)this._manageNode(d);else if(d!==this._rootElement&&"inert"===s.attributeName&&d.hasAttribute("inert")){this._adoptInertRoot(d);var N=this._inertManager.getInertRoot(d),p=!0,E=!1,I=void 0;try{for(var k,S=this._managedNodes[Symbol.iterator]();!(p=(k=S.next()).done);p=!0){var x=k.value;d.contains(x.node)&&N._manageNode(x.node)}}catch(e){E=!0,I=e}finally{try{!p&&S.return&&S.return()}finally{if(E)throw I}}}}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}},{key:"managedNodes",get:function(){return new Set(this._managedNodes)}}]),n}(),s=function(){function e(t,n){i(this,e),this._node=t,this._overrodeFocusMethod=!1,this._inertRoots=new Set([n]),this._destroyed=!1,this.ensureUntabbable()}return o(e,[{key:"destructor",value:function(){this._throwIfDestroyed(),this._node&&(this.hasSavedTabIndex?this._node.setAttribute("tabindex",this.savedTabIndex):this._node.removeAttribute("tabindex"),this._overrodeFocusMethod&&delete this._node.focus),this._node=null,this._inertRoots=null,this._destroyed=!0}},{key:"_throwIfDestroyed",value:function(){if(this.destroyed)throw new Error("Trying to access destroyed InertNode")}},{key:"ensureUntabbable",value:function(){var e=this.node;if(e.matches(r)){if(e.tabIndex===-1&&this.hasSavedTabIndex)return;e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex),e.setAttribute("tabindex","-1"),e.nodeType===Node.ELEMENT_NODE&&(e.focus=function(){},this._overrodeFocusMethod=!0)}else e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex,e.removeAttribute("tabindex"))}},{key:"addInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.add(e)}},{key:"removeInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.delete(e),0===this._inertRoots.size&&this.destructor()}},{key:"destroyed",get:function(){return this._destroyed}},{key:"hasSavedTabIndex",get:function(){return"_savedTabIndex"in this}},{key:"node",get:function(){return this._throwIfDestroyed(),this._node}},{key:"savedTabIndex",set:function(e){this._throwIfDestroyed(),this._savedTabIndex=e},get:function(){return this._throwIfDestroyed(),this._savedTabIndex}}]),e}(),d=function(){function e(t){if(i(this,e),!t)throw new Error("Missing required argument; InertManager needs to wrap a document.");this._document=t,this._managedNodes=new Map,this._inertRoots=new Map,this._observer=new MutationObserver(this._watchForInert.bind(this)),n(t.head||t.body||t.documentElement),"loading"===t.readyState?t.addEventListener("DOMContentLoaded",this._onDocumentLoaded.bind(this)):this._onDocumentLoaded()}return o(e,[{key:"setInert",value:function(e,t){if(t){if(this._inertRoots.has(e))return;var r=new a(e,this);if(e.setAttribute("inert",""),this._inertRoots.set(e,r),!this._document.body.contains(e))for(var i=e.parentNode;i;)11===i.nodeType&&n(i),i=i.parentNode}else{if(!this._inertRoots.has(e))return;var o=this._inertRoots.get(e);o.destructor(),this._inertRoots.delete(e),e.removeAttribute("inert")}}},{key:"getInertRoot",value:function(e){return this._inertRoots.get(e)}},{key:"register",value:function(e,t){var n=this._managedNodes.get(e);return void 0!==n?(n.addInertRoot(t),n.ensureUntabbable()):n=new s(e,t),this._managedNodes.set(e,n),n}},{key:"deregister",value:function(e,t){var n=this._managedNodes.get(e);return n?(n.removeInertRoot(t),n.destroyed&&this._managedNodes.delete(e),n):null}},{key:"_onDocumentLoaded",value:function(){var e=Array.from(this._document.querySelectorAll("[inert]")),t=!0,n=!1,r=void 0;try{for(var i,o=e[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var a=i.value;this.setInert(a,!0)}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}this._observer.observe(this._document.body,{attributes:!0,subtree:!0,childList:!0})}},{key:"_watchForInert",value:function(e,t){var n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;switch(s.type){case"childList":var d=!0,u=!1,l=void 0;try{for(var c,h=Array.from(s.addedNodes)[Symbol.iterator]();!(d=(c=h.next()).done);d=!0){var f=c.value;if(f.nodeType===Node.ELEMENT_NODE){var v=Array.from(f.querySelectorAll("[inert]"));f.matches("[inert]")&&v.unshift(f);var y=!0,m=!1,b=void 0;try{for(var _,g=v[Symbol.iterator]();!(y=(_=g.next()).done);y=!0){var w=_.value;this.setInert(w,!0)}}catch(e){m=!0,b=e}finally{try{!y&&g.return&&g.return()}finally{if(m)throw b}}}}}catch(e){u=!0,l=e}finally{try{!d&&h.return&&h.return()}finally{if(u)throw l}}break;case"attributes":if("inert"!==s.attributeName)continue;var N=s.target,p=N.hasAttribute("inert");this.setInert(N,p)}}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}}]),e}(),u=new d(e);Object.defineProperty(Element.prototype,"inert",{enumerable:!0,get:function(){return this.hasAttribute("inert")},set:function(e){u.setInert(this,e)}})}(document);var a=!1,s=null,d=document.querySelector(".js-main"),u=document.querySelector(".js-movie-container"),l=document.querySelector(".js-movie-container-bg"),c=document.querySelector(".js-movie"),h=document.querySelector(".js-movie-inner"),f=document.querySelector(".js-movie-front"),v=document.querySelector(".js-movie-back"),y=document.querySelector(".js-movie-back-poster"),m=document.querySelectorAll(".js-grid-item"),b=null,_=38,g=39,w=40,N=37,p=27;u.inert=!0;for(var E=0;E<m.length;E++)m[E].addEventListener("click",t),m[E].addEventListener("focus",n);u.addEventListener("click",function(){t.bind(s)()});var I=null,k=void 0;for(k=0;k<m.length;k++){var S=m[k].getBoundingClientRect().top;if(null!==I&&S!==I)break;I=S}document.addEventListener("keydown",function(e){if(e.which===_||e.which===g||e.which===w||e.which===N){var t=document.activeElement;if(!t.closest(".grid-item"))return void m[0].focus();var n=r(t.closest(".grid-item")),i=void 0;e.which===N&&(i=n-1),e.which===g&&(i=n+1),e.which===w&&(i=n+k),e.which===_&&(i=n-k),i>=0&&i<m.length&&m[i].focus()}}),document.addEventListener("keydown",function(e){e.which===p&&a&&t.bind(s)()})}();
//# sourceMappingURL=main.js.map
