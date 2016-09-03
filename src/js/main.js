let modalActive = false;
let activeItem = null;

const movieContainer = document.querySelector('.js-movie-container');
const movieContainerBg = document.querySelector('.js-movie-container-bg');
const movie = document.querySelector('.js-movie');
const movieInner = document.querySelector('.js-movie-inner');
const movieFront = document.querySelector('.js-movie-front');
const movieBack = document.querySelector('.js-movie-back');
const movieBackPoster = document.querySelector('.js-movie-back-poster');

const items = document.querySelectorAll('.js-grid-item');

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
/* eslint-enable */

function flip(e) {
  if (typeof e !== 'undefined') e.preventDefault();

  const poster = this.querySelector('.js-grid-poster');

  // update poster
  if (!modalActive) {
    const image = poster.style.backgroundImage;
    movieFront.style.backgroundImage = image;
    movieBackPoster.style.backgroundImage = image;

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
    }));
  }

  modalActive = !modalActive;
  activeItem = this;
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', flip);
}

movieContainer.addEventListener('click', () => {
  flip.bind(activeItem)();
});
