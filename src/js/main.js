import './_inert.js';

let nextPage = 2;

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

const movieTitle = document.querySelector('.js-movie-title');
const movieOverview = document.querySelector('.js-movie-overview');
const movieReleaseDate = document.querySelector('.js-movie-release-date');
const movieLink = document.querySelector('.js-movie-link');

const items = document.querySelectorAll('.js-grid-item');

let focusedItem = null;

const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;
const ESC = 27;

if (!movieContainer.classList.contains('movie-container--single')) {
  movieContainer.inert = true;
}

function formatDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const year = date.substring(0, 4);
  let month = date.substring(5, 7);
  month = (month.substring(0, 1) === '0') ? month.substring(1) : month;
  month = months[parseInt(month, 10) - 1];
  let day = date.substring(8, 10);
  day = (day.substring(0, 1) === '0') ? day.substring(1) : day;
  return `${day} ${month} ${year}`;
}

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

function get(url, success) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3 && xhr.status === 200) success(xhr.responseText);
  };

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();

  return xhr;
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

    const href = e.target.closest('a').href;

    get(href, data => {
      const movieData = JSON.parse(data);
      movieTitle.textContent = movieData.title;
      movieOverview.textContent = movieData.overview;
      movieReleaseDate.textContent = formatDate(movieData.release_date);
      movieLink.href = `https://www.youtube.com/watch?v=${movieData.youtube_id}`;
    });

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
 * Load more
 */
const loadMore = document.querySelector('.js-load-more');

if (loadMore) {
  loadMore.addEventListener('click', e => {
    e.preventDefault();
    get(e.target.closest('a').href, data => {
      const movies = JSON.parse(data);
      const els = document.createDocumentFragment();
      for (let i = 0; i < movies.length; i++) {

        const li = document.createElement('li');
        li.classList.add('grid-item');

        const a = document.createElement('a');
        a.href = `/${movies[i].youtube_id}`;
        a.classList.add('js-grid-item');

        const div = document.createElement('div');
        div.classList.add('grid-item__poster');
        div.classList.add('js-grid-poster');

        const img = document.createElement('img');
        img.setAttribute('ix-src', `https://fmoyt-10k.imgix.net${movies[i].poster}?w=320&amp;h=480&amp;fit=crop&amp;auto=format,compress`);
        img.alt = '';
        img.setAttribute('sizes', '170px');
        img.classList.add('lazyload');

        const h3 = document.createElement('h3');
        h3.textContent = movies[i].title;

        els.innerHTML += `
          <li class="grid-item">
            <a href="/${movies[i].youtube_id}" class="js-grid-item">
              <div class="grid-item__poster js-grid-poster">
                <img ix-src="https://fmoyt-10k.imgix.net${movies[i].poster}?w=320&amp;h=480&amp;fit=crop&amp;auto=format,compress" alt="" sizes="170px" class="lazyload">
              </div>
              <h3>${movies[i].title}</h3>
              <time datetime="2016" class="mono">${movies[i].release_date}</time>
            </a>
          </li>
        `;
      }
      console.log(els);
      loadMore.parentNode.insertBefore(els, loadMore);
    });
  });
}

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
