const navigation = {
  init: function() {
    this.homePage = document.querySelector(`.js-home`);
    this.libraryPage = document.querySelector(`.js-library`);
    this.searchPage = document.querySelector(`.js-search`);
    this.homePageLink = document.querySelector(`a[href="/"]`);
    this.libraryPageLink = document.querySelector(`a[href="/library"]`);

    this.hidePages();
  },
  hidePages: function() {
    this.homePage.style.display = `none`;
    this.libraryPage.style.display = `none`;
    this.searchPage.style.display = `none`;

    if (window.location.pathname === `/`) {
      this.homePage.style.display = `block`;
    }

    if (window.location.pathname === `/library`) {
      this.libraryPage.style.display = `block`;
    }

    if (window.location.pathname === `/search`) {
      this.searchPage.style.display = `block`;
    }
  },
};

navigation.init();
