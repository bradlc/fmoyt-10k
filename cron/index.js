'use strict';

const request = require('request');
const URL = require('url');

const mdbApiKey = '79a7bed15569fc5ef748550431a0c817';

function getPosts() {
  return new Promise((resolve, reject) => {
    const url = 'https://www.reddit.com/r/fullmoviesonyoutube.json?limit=100';
    request(url, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(err);
      }
      resolve(JSON.parse(body).data.children);
    });
  });
}

function getYouTubeIdFromUrl(url) {
  const parsedUrl = URL.parse(url, true);
  if ((parsedUrl.hostname === 'youtube.com' || parsedUrl.hostname === 'www.youtube.com') && parsedUrl.query.v) {
    return parsedUrl.query.v;
  }
  if (parsedUrl.hostname === 'youtu.be') {
    return parsedUrl.pathname.substr(1);
  }
  return null;
}

function removeNonYouTube(posts) {
  const filtered = posts.filter(post => {
    const youtubeId = getYouTubeIdFromUrl(post.data.url);
    if (youtubeId === null) {
      return false;
    }
    return true;
  });
  return filtered.map(post => Object.assign({}, post, { youtube_id: getYouTubeIdFromUrl(post.data.url) }));
}

function getMovieInfo(posts) {
  const reqs = [];
  posts.forEach((post, index) => {
    let title = post.data.title.replace(/\[.*?\]/g, '');
    let year = title.match(/\(([0-9]{4})\)/, title);
    year = (year) ? year[1] : null;
    title = title.replace(/\(([0-9]{4})\)/g, '');
    title = title.trim();
    title = encodeURIComponent(title);

    let params = `query=${title}`;

    if (year) {
      params += `&year=${year}`;
    }

    const apiurl = `https://api.themoviedb.org/3/search/movie?${params}&api_key=${mdbApiKey}`;

    reqs.push(new Promise((resolve, reject) => {
      const wait = index * 300;
      setTimeout(() => {
        request(apiurl, (err, res, body) => {
          if (err || res.statusCode !== 200) {
            reject(err);
          }
          resolve(Object.assign({}, JSON.parse(body), { youtube_id: getYouTubeIdFromUrl(post.data.url) }));
        });
      }, wait);
    }));
  });

  return new Promise((resolve, reject) => {
    Promise.all(reqs).then(results => {
      const movies = results.map(mdbresult => {
        if (mdbresult.total_results === 0) return null;
        const movie = mdbresult.results[0];
        return {
          poster: movie.poster_path,
          overview: movie.overview,
          genres: movie.genre_ids,
          mdb_id: movie.id,
          original_title: movie.original_title,
          title: movie.title,
          backdrop: movie.backdrop_path,
          release_date: movie.release_date,
          youtube_id: mdbresult.youtube_id,
        };
      });
      resolve(movies.filter(movie => movie !== null));
    }).catch(err => reject(err));
  });
}

getPosts().then(removeNonYouTube).then(getMovieInfo).then(data => console.log(data));
