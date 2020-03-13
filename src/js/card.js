import FETCH_FILMS from './api/FETCH_FILMS';
import homePage from '../js/home';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';

export default {
  init: function() {
    this.main = document.querySelector(`.page-main`);
    this.filmId = this.filmId
      ? this.filmId
      : window.location.search.split('?')[1];

    this.bindEvents();
  },
  bindEvents: function() {
    homePage.filmList.addEventListener(
      `click`,
      this.generateFilmInfoPage.bind(this),
    );
  },
  getFilmId: async function(event) {
    if (event.target.tagName === 'IMG') {
      this.filmId = event.target.dataset.id;
    } else if (event.target.tagName === 'P') {
      this.filmId = event.target.previousElementSibling.dataset.id;
    } else return;
  },
  getMovieData: function() {
    if (this.filmId) {
      navigation.clearMarkup();
      FETCH_FILMS.filmInfo(this.filmId).then(data => {
        this.putTemplates(this.main, filmInfoTemplate(data));
      });
    } else return;
  },
  generateFilmInfoPage: function() {
    this.clearMarkup();
    if (window.location.href.indexOf('movie') === -1) {
      this.getFilmId(event);
    }

    this.getMovieData();
    history.pushState(null, null, `/movie?${this.filmId}`);
  },
  clearMarkup: function() {
    this.main.innerHTML = ``;
  },
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
};
