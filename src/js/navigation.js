import homePage from '../templates/home-page.hbs';
import searchPage from '../templates/search-page.hbs';
import libraryPage from '../templates/library-page.hbs';

const navigation = {
  init: function() {
    this.main = document.querySelector(`.page-main`);
    this.homePageLink = document.querySelector(`a[href="/"]`);
    this.libraryPageLink = document.querySelector(`a[href="/library"]`);

    this.showPages();
  },
  showPages: function() {
    if (window.location.pathname === `/`) {
      this.putTemplates(this.main, homePage(this.main));
    }

    if (window.location.pathname === `/library`) {
      this.putTemplates(this.main, libraryPage(this.main));
    }

    if (window.location.pathname === `/search`) {
      this.putTemplates(this.main, searchPage(this.main));
    }
  },
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
};

navigation.init();
