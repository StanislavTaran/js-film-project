import FETCH_FILMS from './api/FETCH_FILMS';

const search = {
  init: function() {
    this.searchForm = document.querySelector(`.search__form`);

    this.bindEvents();
  },
  bindEvents: function() {
    this.searchForm.addEventListener(
      `submit`,
      this.renderSearchPage.bind(this),
    );
  },
  renderSearchPage: function(e) {
    e.preventDefault();
    window.location.href = `search`;
  },
};

search.init();
