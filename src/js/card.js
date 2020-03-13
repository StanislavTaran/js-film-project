import FETCH_FILMS from './api/FETCH_FILMS';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';

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
      navigation.clearMarkup();
      FETCH_FILMS.filmInfo(this.filmId).then(data => {
        this.putTemplates(this.main, filmInfoTemplate(data));
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
      this.clearMarkup();
      this.getMovieData();
      history.pushState(null, null, `/movie?${this.filmId}`);
    }
  },
  addToWatched: function() {
    navigation.watched.forEach(element => {
      console.log(element);
      if (element !== this.filmId) {
        navigation.watched.push([this.filmId]);
        localStorage.setItem('films', navigation.watched);
      }
    });
  },
  clearMarkup: function() {
    this.main.innerHTML = ``;
  },
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
};
