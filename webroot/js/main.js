!function(){"use strict";function e(e,t){var n=void 0;return function(){return e&&(n=e.apply(t||this,arguments),e=null),n}}function t(t){"undefined"!=typeof t&&t.preventDefault();var n=this.querySelector(".js-grid-poster");if(!i){var m=n.querySelector("img"),v="undefined"!=typeof m.currentSrc?m.currentSrc:m.src;a.style.backgroundImage="url('"+v+"')",d.style.backgroundImage="url('"+v+"')",o.classList.add("movie-container--visible")}var f=s.getBoundingClientRect(),y=n.getBoundingClientRect(),h=1/(f.width/y.width),p=y.left-f.left,g=y.top-f.top;if(s.style.transform="translate("+p+"px, "+g+"px)",l.style.transform="scale("+h+")",i)s.classList.remove("movie--flipped"),c.style.opacity=0,s.addEventListener("transitionend",e(function(){n.style.opacity=1,o.classList.remove("movie-container--animate"),o.classList.remove("movie-container--visible"),s.style.transform="none",l.style.transform="none"}));else{var w=3*(1/h);a.style.borderRadius=w+"px",u.style.borderRadius=w+"px",n.style.opacity=0,window.requestAnimationFrame(function(){o.classList.add("movie-container--animate"),l.style.transform="none",s.style.transform="none",c.style.opacity=1,s.classList.add("movie--flipped")})}i=!i,r=this}function n(e){for(var t=0;e=e.previousElementSibling;t++);return t}for(var i=!1,r=null,o=document.querySelector(".js-movie-container"),c=document.querySelector(".js-movie-container-bg"),s=document.querySelector(".js-movie"),l=document.querySelector(".js-movie-inner"),a=document.querySelector(".js-movie-front"),u=document.querySelector(".js-movie-back"),d=document.querySelector(".js-movie-back-poster"),m=document.querySelectorAll(".js-grid-item"),v=38,f=39,y=40,h=37,p=0;p<m.length;p++)m[p].addEventListener("click",t);o.addEventListener("click",function(){t.bind(r)()});var g=null,w=void 0;for(w=0;w<m.length;w++){var S=m[w].getBoundingClientRect().top;if(null!==g&&S!==g)break;g=S}document.addEventListener("keydown",function(e){if(e.which===v||e.which===f||e.which===y||e.which===h){var t=document.activeElement;if(!t.closest(".grid-item"))return void m[0].focus();var i=n(t.closest(".grid-item")),r=void 0;e.which===h&&(r=i-1),e.which===f&&(r=i+1),e.which===y&&(r=i+w),e.which===v&&(r=i-w),r>=0&&r<m.length&&m[r].focus()}})}();
//# sourceMappingURL=main.js.map
