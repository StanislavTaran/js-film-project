import homePageTemplate from '../templates/home-page.hbs';
import libraryPageTemplate from '../templates/library-page.hbs';
import homePage from '../js/home';
import filmInfo from '../js/card';
import library from '../js/library';
import search from '../js/search';

const navigation = {
  init: function() {
    this.main = document.querySelector(`.page-main`);
    this.homePageLink = document.querySelector(`.header-nav__link--main`);
    this.logoLink = document.querySelector(`.header-nav__logo`);
    this.libraryPageLink = document.querySelector(`.header-nav__link--library`);
    this.mainPage = document.querySelector(`.js-home`);

    this.bindEvents();
    this.showPages();
  },
  bindEvents: function() {
    this.homePageLink.addEventListener(
      `click`,
      this.generateHomePage.bind(this),
    );
    this.logoLink.addEventListener(`click`, this.generateHomePage.bind(this));
    this.libraryPageLink.addEventListener(
      `click`,
      this.generateLibraryPage.bind(this),
    );
  },
  generatePage: function() {
    this.clearMarkup();
    this.putTemplates(this.main, homePageTemplate(this.main));
    homePage.init();
  },
  generateHomePage: function(e) {
    e.preventDefault();
    history.pushState(null, null, '/');
    this.generatePage();
  },
  generateLibraryPage: function(e) {
    e.preventDefault();
    this.clearMarkup();
    this.putTemplates(this.main, libraryPageTemplate(this.main));
    history.pushState(null, null, '/library');
    library.init();
  },
  generateFilmInfoPage: function(e) {
    if (e.target.tagName === 'UL') {
      return;
    } else {
      filmInfo.getFilmId(e);
      navigation.clearMarkup();
      history.pushState(null, null, `/movie?${this.filmId}`);
      filmInfo.getMovieData();
    }
  },
  showPages: function() {
    this.generatePage();

    if (window.location.href.indexOf('library') > -1) {
      library.init();
    }

    if (window.location.href.indexOf('movie') > -1) {
      this.clearMarkup();
      filmInfo.init();
    }
  },
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
  clearMarkup: function() {
    this.main.innerHTML = ``;
  },
};

navigation.init();
export { navigation };
