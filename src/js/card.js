import FETCH_FILMS from './api/FETCH_FILMS';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';
import utils from './utils';

export default {
  init: function() {
    this.main = document.querySelector(`.page-main`);
    this.filmList = document.querySelector(`.page-main__films-list`);

    this.filmId = this.filmId
      ? this.filmId
      : window.location.search.split('?')[1];

    this.bindEvents();
  },
  bindEvents: function() {
    this.filmList.addEventListener(
      `click`,
      this.generateFilmInfoPage.bind(this),
    );
  },
  getFilmId: function(event) {
    if (event.target.tagName === 'IMG') {
      this.filmId = event.target.dataset.id;
    } else if (event.target.tagName === 'P') {
      this.filmId = event.target.previousElementSibling.dataset.id;
    } else {
      this.filmId = undefined;
    }
  },
  getMovieData: function() {
    if (this.filmId) {
      utils.clearMarkup(navigation.main);
      FETCH_FILMS.filmInfo(this.filmId).then(data => {
        utils.putTemplates(this.main, filmInfoTemplate(data));
        this.addToWatchBtn = document.querySelector(`#overlooked`);
        this.addToWatchBtn.addEventListener(
          `click`,
          this.addToWatched.bind(this),
        );
      });
    } else return;
  },
  generateFilmInfoPage: function() {
    if (window.location.href.indexOf('movie') === -1) {
      this.getFilmId(event);
    }

    if (this.filmId !== undefined) {
      utils.clearMarkup(this.main);
      this.getMovieData();
      history.pushState(null, null, `/movie?${this.filmId}`);
    }
  },
  addToWatched: function() {
    if (navigation.watched.length !== 0) {
      if (navigation.watched.indexOf(this.filmId) === -1) {
        navigation.watched.push(this.filmId);
        localStorage.setItem('films', [navigation.watched]);
      }
    } else {
      navigation.watched.push(this.filmId);
      localStorage.setItem('films', [navigation.watched]);
    }

    console.log(navigation.watched);
  },
};
