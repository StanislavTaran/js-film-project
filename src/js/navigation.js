import homePageTemplate from '../templates/home-page.hbs';
import libraryPageTemplate from '../templates/library-page.hbs';
import homePage from '../js/home';
import filmInfo from '../js/card';
import library from '../js/library';
import utils from './utils';

const navigation = {
  init: function() {
    this.watched = localStorage.getItem('watchedFilms')
      ? localStorage.getItem('watchedFilms').split(',')
      : [];
    this.queued = localStorage.getItem('queuedFilms')
      ? localStorage.getItem('queuedFilms').split(',')
      : [];
    this.main = document.querySelector(`.page-main`);
    this.homePageLink = document.querySelector(`.header-nav__link--main`);
    this.logoLink = document.querySelector(`.header-nav__logo`);
    this.libraryPageLink = document.querySelector(`.header-nav__link--library`);
    this.mainPage = document.querySelector(`.js-home`);
    this.toTopBtn = document.querySelector(`.page-footer__to-top`);
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
    this.toTopBtn.addEventListener(`click`, this.scrollToTop.bind(this));
  },
  generateHome: function() {
    utils.clearMarkup(this.main);
    utils.putTemplates(this.main, homePageTemplate(this.main));
    homePage.init();
  },
  generateHomePage: function(e) {
    e.preventDefault();
    // history.pushState(null, null, '/');
    window.location = '#'
    this.generateHome();
  },
  generateLibraryPage: function(e) {
    e.preventDefault();
    this.generateLibrary();
  },
  generateLibrary: function() {
    utils.clearMarkup(this.main);
    utils.putTemplates(this.main, libraryPageTemplate(this.main));
    window.location = '#library'
    // history.pushState(null, null, 'library');
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
  deleteLoader: function() {
    setTimeout(() => {
      const loader = document.querySelector(`.loader`);
      const body = document.querySelector(`body`);
      const header = document.querySelector(`header`);
      const footer = document.querySelector(`footer`);

      header.style.visibility = 'visible';
      footer.style.visibility = 'visible';
      body.style.overflow = 'visible';
      loader.style.display = 'none';
    }, 500);
  },
  scrollToTop: function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
};

navigation.init();
export { navigation };
