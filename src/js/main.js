import './_inert.js';

let modalActive = false;
let activeItem = null;

const main = document.querySelector('.js-main');
const movieContainer = document.querySelector('.js-movie-container');
const movieContainerBg = document.querySelector('.js-movie-container-bg');
const movie = document.querySelector('.js-movie');
const movieInner = document.querySelector('.js-movie-inner');
const movieFront = document.querySelector('.js-movie-front');
const movieBack = document.querySelector('.js-movie-back');
const movieBackPoster = document.querySelector('.js-movie-back-poster');

const items = document.querySelectorAll('.js-grid-item');

let focusedItem = null;

const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;
const ESC = 27;

movieContainer.inert = true;

/* eslint-disable */
function once(fn, context) {
  let result;

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
/* eslint-enable */

function flip(e) {
  if (typeof e !== 'undefined') e.preventDefault();

  const poster = this.querySelector('.js-grid-poster');

  // update poster
  if (!modalActive) {
    const image = poster.querySelector('img');
    const src = typeof image.currentSrc !== 'undefined' ? image.currentSrc : image.src;
    movieFront.style.backgroundImage = `url('${src}')`;
    movieBackPoster.style.backgroundImage = `url('${src}')`;

    movieContainer.classList.add('movie-container--visible');
  }

  const fromRect = movie.getBoundingClientRect();
  const toRect = poster.getBoundingClientRect();

  const scale = 1 / (fromRect.width / toRect.width);
  const left = toRect.left - fromRect.left;
  const top = toRect.top - fromRect.top;

  movie.style.transform = `translate(${left}px, ${top}px)`;
  movieInner.style.transform = `scale(${scale})`;

  // border radius
  if (!modalActive) {
    const borderRadius = 3 * (1 / scale);
    movieFront.style.borderRadius = `${borderRadius}px`;
    movieBack.style.borderRadius = `${borderRadius}px`;

    poster.style.opacity = 0;

    movieContainer.inert = false;
    main.inert = true;

    window.requestAnimationFrame(() => {
      movieContainer.classList.add('movie-container--animate');
      movieInner.style.transform = 'none';
      movie.style.transform = 'none';
      movieContainerBg.style.opacity = 1;
      movie.classList.add('movie--flipped');
    });
  } else {
    movie.classList.remove('movie--flipped');
    movieContainerBg.style.opacity = 0;
    movie.addEventListener('transitionend', once(() => {
      poster.style.opacity = 1;
      movieContainer.classList.remove('movie-container--animate');
      movieContainer.classList.remove('movie-container--visible');
      movie.style.transform = 'none';
      movieInner.style.transform = 'none';

      movieContainer.inert = true;
      main.inert = false;

      if (focusedItem) {
        focusedItem.focus();
      }
    }));
  }

  modalActive = !modalActive;
  activeItem = this;
}

function setFocusedItem(event) {
  focusedItem = event.target.closest('.js-grid-item');
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', flip);

  items[i].addEventListener('focus', setFocusedItem);
}

movieContainer.addEventListener('click', () => {
  flip.bind(activeItem)();
});

/**
 * Keyboard nav
 */
function getPerRow() {
  let top = null;
  let i;
  for (i = 0; i < items.length; i++) {
    const newTop = items[i].getBoundingClientRect().top;
    if (top !== null && newTop !== top) {
      break;
    }
    top = newTop;
  }
  return i;
}
let perRow = getPerRow();
window.addEventListener('resize', debounce(() => {
  perRow = getPerRow();
}, 250));

document.addEventListener('keydown', e => {
  if (e.which !== UP && e.which !== RIGHT && e.which !== DOWN && e.which !== LEFT) return;
  const activeEl = document.activeElement;
  if (!activeEl.closest('.grid-item')) {
    items[0].focus();
    return;
  }
  const currentIndex = getNodeIndex(activeEl.closest('.grid-item'));
  let newIndex;
  if (e.which === LEFT) {
    newIndex = currentIndex - 1;
  }
  if (e.which === RIGHT) {
    newIndex = currentIndex + 1;
  }
  if (e.which === DOWN) {
    newIndex = currentIndex + perRow;
  }
  if (e.which === UP) {
    newIndex = currentIndex - perRow;
  }
  if (newIndex >= 0 && newIndex < items.length) {
    items[newIndex].focus();
  }
});

document.addEventListener('keydown', e => {
  if (e.which === ESC && modalActive) {
    flip.bind(activeItem)();
  }
});

function getNodeIndex(node) {
  for (var i = 0; node = node.previousElementSibling; i++);
  return i;
}
