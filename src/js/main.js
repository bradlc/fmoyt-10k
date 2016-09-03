const movieContainer = document.querySelector('.js-movie-container');
const movie = document.querySelector('.js-movie');
const movieInner = document.querySelector('.js-movie-inner');
const movieFront = document.querySelector('.js-movie-front');
const movieBackPoster = document.querySelector('.js-movie-back-poster');

const items = document.querySelectorAll('.js-grid-item');

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', e => {
    e.preventDefault();

    const poster = e.target.closest('.js-grid-item').querySelector('.js-grid-poster');

    // update poster
    const image = poster.style.backgroundImage;
    movieFront.style.backgroundImage = image;
    movieBackPoster.style.backgroundImage = image;

    movieContainer.classList.add('movie-container--visible');

    const fromRect = movie.getBoundingClientRect();
    const toRect = poster.getBoundingClientRect();

    const scale = 1 / (fromRect.width / toRect.width);
    const left = toRect.left - fromRect.left;
    const top = toRect.top - fromRect.top;

    movie.style.transform = `translate(${left}px, ${top}px)`;
    movieInner.style.transform = `scale(${scale})`;

    e.target.closest('.js-grid-item').style.opacity = 0;

    window.requestAnimationFrame(() => {
      movieContainer.classList.add('movie-container--animate');
      movieInner.style.transform = 'none';
      movie.style.transform = 'none';
      movie.classList.add('movie--flipped');
    });
  });
}
