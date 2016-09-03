const movieContainer = document.querySelector('.js-movie-container');
const movie = document.querySelector('.js-movie');
const movieInner = document.querySelector('.js-movie-inner');

const items = document.querySelectorAll('.js-grid-item');

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', e => {
    e.preventDefault();
    movieContainer.classList.add('movie-container--visible');

    const poster = e.target.closest('.js-grid-item').querySelector('.js-grid-poster');

    const fromRect = movie.getBoundingClientRect();
    const toRect = poster.getBoundingClientRect();

    const scale = 1 / (fromRect.width / toRect.width);
    const left = toRect.left - fromRect.left;
    const top = toRect.top - fromRect.top;

    movie.style.transform = `translate(${left}px, ${top}px)`;
    movieInner.style.transform = `scale(${scale})`;

    window.requestAnimationFrame(() => {
      movieInner.classList.add('animate');
      movie.classList.add('animate');
      movieInner.style.transform = 'none';
      movie.style.transform = 'none';
      movie.classList.add('movie--flipped');
    });
  });
}
