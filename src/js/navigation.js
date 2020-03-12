import homePageTemplate from '../templates/home-page.hbs';
import libraryPageTemplate from '../templates/library-page.hbs';
import homePage from '../js/home';
import filmInfo from '../js/card';

const navigation = {
  init: function() {
    this.main = document.querySelector(`.page-main`);
    this.homePageLink = document.querySelector(`.header-nav__link--main`);
    this.logoLink = document.querySelector(`.header-nav__logo`);
    this.libraryPageLink = document.querySelector(`.header-nav__link--library`);

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
  generateHomePage: function(e) {
    e.preventDefault();
    this.clearMarkup();
    history.pushState(null, null, '/');
    this.putTemplates(this.main, homePageTemplate(this.main));

    homePage.init();
  },
  generateLibraryPage: function(e) {
    e.preventDefault();
    this.clearMarkup();
    history.pushState(null, null, '/library');
    this.putTemplates(this.main, libraryPageTemplate(this.main));
  },
  showPages: function() {
    if (window.location.pathname === `/`) {
      this.putTemplates(this.main, homePageTemplate(this.main));
      homePage.init();
    }

    if (window.location.pathname === `/library`) {
      this.putTemplates(this.main, libraryPageTemplate(this.main));
    }

    if (window.location.pathname === `/search`) {
      this.putTemplates(this.main, homePageTemplate(this.main));
      homePage.init();
    }

    if (window.location.href.indexOf('movie') > -1) {
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
