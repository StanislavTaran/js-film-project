import FETCH_FILMS from './api/FETCH_FILMS';
import homePage from '../js/home';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';

export default {
  init: function() {
    // this.mainPoster = document.querySelector('.film-poster');
    this.filmId = this.filmId
      ? this.filmId
      : window.location.search.split('?')[1];

    if (window.location.pathname === '/movie') {
      this.getMovieData();
    }

    this.bindEvents();
  },
  bindEvents: function() {
    if (homePage.filmList) {
      homePage.filmList.addEventListener(
        `click`,
        navigation.generateFilmInfoPage.bind(this),
      );
    }
  },
  getFilmId: function(event) {
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
        navigation.putTemplates(navigation.main, filmInfoTemplate(data));
      });
    } else return;
  },
};
