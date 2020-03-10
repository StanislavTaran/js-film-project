import homePageTemplate from '../templates/home-page.hbs';
import searchPageTemplate from '../templates/search-page.hbs';
import libraryPageTemplate from '../templates/library-page.hbs';
import homePage from '../js/home';

const navigation = {
  init: function() {
    this.main = document.querySelector(`.page-main`);
    this.homePageLink = document.querySelector(`a[href="/"]`);
    this.libraryPageLink = document.querySelector(`a[href="/library"]`);

    this.showPages();
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
      this.putTemplates(this.main, searchPageTemplate(this.main));
    }
  },
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
};

navigation.init();
