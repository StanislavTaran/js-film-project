import homePageTemplate from '../templates/home-page.hbs';
import libraryPageTemplate from '../templates/library-page.hbs';
import homePage from '../js/home';
import filmInfo from '../js/card';
import library from '../js/library';

const navigation = {
  init: function() {
    this.watched = localStorage.getItem('films')
      ? localStorage.getItem('films').split(',')
      : [];
    this.main = document.querySelector(`.page-main`);
    this.homePageLink = document.querySelector(`.header-nav__link--main`);
    this.logoLink = document.querySelector(`.header-nav__logo`);
    this.libraryPageLink = document.querySelector(`.header-nav__link--library`);
    this.mainPage = document.querySelector(`.js-home`);
    this.loader = document.querySelector(`.loader`);

    this.bindEvents();
    this.showPages();
    window.onload = this.deleteLoader();
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
  generateHome: function() {
    this.clearMarkup();
    this.putTemplates(this.main, homePageTemplate(this.main));
    homePage.init();
  },
  generateHomePage: function(e) {
    e.preventDefault();
    history.pushState(null, null, '/');
    this.generateHome();
  },
  generateLibraryPage: function(e) {
    e.preventDefault();
    this.generateLibrary();
  },
  generateLibrary: function() {
    this.clearMarkup();
    this.putTemplates(this.main, libraryPageTemplate(this.main));
    history.pushState(null, null, '/library');
    library.init();
  },
  showPages: function() {
    this.generateHome();

    if (window.location.href.indexOf('library') > -1) {
      this.generateLibrary();
    }

    if (window.location.href.indexOf('movie') > -1) {
      filmInfo.generateFilmInfoPage();
    }
  },
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
  clearMarkup: function() {
    this.main.innerHTML = ``;
  },
  deleteLoader: function() {
    setTimeout(() => {
      const loader = document.querySelector(`.loader`);

      loader.style.display = 'none';
    }, 500);
  },
};

navigation.init();
export { navigation };
