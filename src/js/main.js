/* global imgix */

import './_inert.js';
import './_idb_keyval.js';

let modalActive = false;
let videoActive = false;
let activeItem = null;
let activeMovie = null;

const main = document.querySelector('.js-main');
const header = document.querySelector('.js-header');
const footer = document.querySelector('.js-footer');
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

const grid = document.querySelector('.js-grid');
let items = document.querySelectorAll('.js-grid-item');

const saveBtn = document.querySelector('.js-save');
const saveBtnText = document.querySelector('.js-save .btn__text');
const saveBtnIcon = document.querySelector('.js-save .btn__icon');
let savedCount = 0;

const watch = document.querySelector('.js-watch');
const iframe = document.querySelector('.js-iframe');

let focusedItem = null;

const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;
const ESC = 27;

if (!movieContainer.classList.contains('movie-container--single')) {
  movieContainer.inert = true;
}

watch.inert = true;

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

    document.body.classList.add('no-scroll');
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
    header.inert = true;
    footer.inert = true;

    const href = e.target.closest('a').href;

    get(href, data => {
      const movieData = JSON.parse(data);
      movieTitle.textContent = movieData.title;
      movieOverview.textContent = movieData.overview;
      movieReleaseDate.textContent = formatDate(movieData.release_date);
      movieLink.href = `https://www.youtube.com/watch?v=${movieData.youtube_id}`;

      activeMovie = {
        title: movieData.title,
        overview: movieData.overview,
        poster: movieData.poster,
        release_date: movieData.release_date,
        id: movieData.youtube_id,
      };

      idbKeyval.get('fmoyt-saved').then(saved => {
        if (!saved || typeof saved === 'undefined') return;

        for (let i = 0; i < saved.length; i++) {
          if (saved[i].id === movieData.youtube_id) {
            saveBtnText.textContent = 'Saved';
            saveBtnIcon.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>`;
            saveBtn.disabled = true;
            break;
          }
        }
      });

      saveBtn.setAttribute('data-title', movieData.title);
      saveBtn.setAttribute('data-id', movieData.youtube_id);
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
      document.body.classList.remove('no-scroll');
      movie.style.transform = 'none';
      movieInner.style.transform = 'none';

      movieContainer.inert = true;
      main.inert = false;
      header.inert = false;
      footer.inert = false;

      // reset save button
      saveBtnText.textContent = 'Save';
      saveBtnIcon.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>`;
      saveBtn.disabled = false;

      if (focusedItem) {
        focusedItem.focus();
      }
    }));
  }

  modalActive = !modalActive;
  activeItem = this;
}

if (grid) {
  window.addEventListener('click', e => {
    const item = e.target.closest('.js-grid-item');
    if (item) {
      e.preventDefault();
      flip.bind(item, e)();
    }
  });

  grid.addEventListener('focus', e => {
    focusedItem = e.target.closest('.js-grid-item');
  }, true);
}

movieContainerBg.addEventListener('click', () => {
  flip.bind(activeItem)();
});

document.querySelector('.js-close-movie').addEventListener('click', () => {
  flip.bind(activeItem)();
});

/**
 * Load more
 */
const loadMore = document.querySelector('.js-load-more');

function createGridItem(id, poster, title, releaseDate) {
  const li = document.createElement('li');
  li.classList.add('grid-item');

  const a = document.createElement('a');
  a.href = `/${id}`;
  a.classList.add('js-grid-item');

  const div = document.createElement('div');
  div.classList.add('grid-item__poster');
  div.classList.add('js-grid-poster');

  const img = document.createElement('img');
  img.setAttribute('ix-src', `https://fmoyt-10k.imgix.net${poster}?w=320&amp;h=480&amp;fit=crop&amp;auto=format,compress`);
  img.alt = '';
  img.setAttribute('sizes', '170px');
  img.classList.add('lazyload');

  const h3 = document.createElement('h3');
  h3.textContent = title;

  const year = releaseDate.substring(0, 4);
  const time = document.createElement('time');
  time.setAttribute('datetime', year);
  time.classList.add('mono');
  time.textContent = year;

  div.appendChild(img);
  a.appendChild(div);
  a.appendChild(h3);
  a.appendChild(time);
  li.appendChild(a);

  return li;
}

if (loadMore) {
  loadMore.addEventListener('click', e => {
    e.preventDefault();

    const link = e.target.closest('a');
    const href = link.href;

    let currentPage = href.match(/[0-9]+$/);
    currentPage = parseInt(currentPage[0], 10);
    link.href = `/page/${currentPage + 1}`;

    link.setAttribute('disabled', 'disabled');

    if (currentPage === 20) {
      link.style.display = 'none';
    }

    get(href, data => {
      const movies = JSON.parse(data);
      const els = document.createDocumentFragment();
      for (let i = 0; i < movies.length; i++) {
        const li = createGridItem(movies[i].youtube_id, movies[i].poster, movies[i].title, movies[i].release_date);
        els.appendChild(li);
      }

      grid.appendChild(els);
      link.removeAttribute('disabled');

      requestAnimationFrame(() => {
        items = document.querySelectorAll('.js-grid-item');
        imgix.init({
          srcAttribute: 'data-src',
          srcsetAttribute: 'data-srcset',
          sizesAttribute: 'data-sizes',
        });
      });
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
  if (e.which === ESC && videoActive) {
    videoActive = false;
    watch.classList.remove('watch--active');
    watch.addEventListener('transitionend', once(() => {
      iframe.src = '';
      watch.inert = true;
      movieContainer.inert = false;
    }));
    return;
  }
  if (e.which === ESC && modalActive) {
    flip.bind(activeItem)();
  }
});

function getNodeIndex(node) {
  for (var i = 0; node = node.previousElementSibling; i++);
  return i;
}


/**
 * Save
 */
saveBtn.addEventListener('click', e => {
  const btn = e.target.closest('.js-save');
  idbKeyval.get('fmoyt-saved').then(saved => {
    let save;
    if (typeof saved === 'undefined') {
      save = [];
    } else {
      save = saved.slice(0);
    }
    save.push(activeMovie);
    idbKeyval.set('fmoyt-saved', save).then(_ => console.log('saved'));

    saveBtnText.textContent = 'Saved';
    saveBtnIcon.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>`;
    saveBtn.disabled = true;

    // add to saved grid
    const li = createGridItem(activeMovie.id, activeMovie.poster, activeMovie.title, activeMovie.release_date);
    document.querySelector('.js-saved-grid').appendChild(li);

    savedCount++;
    document.querySelector('.js-saved-tab').textContent = `Saved (${savedCount})`;

    requestAnimationFrame(() => {
      items = document.querySelectorAll('.js-grid-item');
      imgix.init({
        srcAttribute: 'data-src',
        srcsetAttribute: 'data-srcset',
        sizesAttribute: 'data-sizes',
      });
    });
  });
});



const tablist = document.querySelector('.js-tablist');

idbKeyval.get('fmoyt-saved').then(saved => {
  if (saved && typeof saved !== 'undefined') {
    savedCount = saved.length;
  }

  tablist.innerHTML = `<ul role="tablist">
      <li role="presentation">
        <a class="js-tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
      </li>
      <li role="presentation">
        <a class="js-tab js-saved-tab" href="#saved" role="tab" aria-controls="saved">Saved (${savedCount})</a>
      </li>
    </ul>`;
});

window.addEventListener('click', e => {
  if (e.target.closest('.js-tab')) {
    e.preventDefault();
    const tabs = document.querySelectorAll('.js-tab');
    const panels = document.querySelectorAll('[role="tabpanel"]');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].removeAttribute('aria-selected');
    }
    e.target.closest('.js-tab').setAttribute('aria-selected', 'true');

    for (let i = 0; i < panels.length; i++) {
      panels[i].setAttribute('aria-hidden', 'true');
    }
    document.querySelector(e.target.closest('.js-tab').getAttribute('href')).removeAttribute('aria-hidden');
  }
});


idbKeyval.get('fmoyt-saved').then(saved => {
  if (saved) {
    const ul = document.createDocumentFragment();
    for (let i = 0; i < saved.length; i++) {
      const li = createGridItem(saved[i].id, saved[i].poster, saved[i].title, saved[i].release_date);
      ul.appendChild(li);
    }
    document.querySelector('.js-saved-grid').appendChild(ul);
    requestAnimationFrame(() => {
      items = document.querySelectorAll('.js-grid-item');
      imgix.init({
        srcAttribute: 'data-src',
        srcsetAttribute: 'data-srcset',
        sizesAttribute: 'data-sizes',
      });
    });
  }
});


movieLink.addEventListener('click', e => {
  e.preventDefault();

  watch.inert = false;
  movieContainer.inert = true;
  videoActive = true;
  watch.classList.add('watch--active');
  watch.addEventListener('transitionend', once(() => {
    iframe.src = `https://www.youtube.com/embed/${activeMovie.id}?autoplay=1`;
  }));
});


document.querySelector('.js-close-watch').addEventListener('click', () => {
  videoActive = false;
  watch.classList.remove('watch--active');
  watch.addEventListener('transitionend', once(() => {
    iframe.src = '';
    watch.inert = true;
    movieContainer.inert = false;
  }));
});
