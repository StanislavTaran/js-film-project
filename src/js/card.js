// import FETCH_FILMS from './api/FETCH_FILMS';
import homePage from '../js/home';
import { navigation } from './navigation';

export default {
  init: function() {
    this.mainPoster = document.querySelector('.film-poster');
    this.filmId = null;
    this.bindEvents();
  },
  bindEvents: function() {
    homePage.filmList.addEventListener(`click`, this.getFilmInfo.bind(this));
  },
  getFilmInfo: function(e) {
    if (e.target.tagName === 'IMG') {
      this.filmId = e.target.dataset.id;
    } else if (e.target.tagName === 'P') {
      this.filmId = e.target.previousElementSibling.dataset.id;
    } else return;
  },
  generateFilmInfoPage: function(e) {
    navigation.clearMarkup();
    history.pushState(null, null, `/movie?${this.filmId}`);
    navigation.putTemplates(
      navigation.main,
      libraryPageTemplate(navigation.main),
    );
  },
};
