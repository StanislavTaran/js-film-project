import FETCH_FILMS from './api/FETCH_FILMS';
import cardTemplate from '../templates/card.hbs';
import utils from './utils';

export default {
  init: function() {
    this.query = this.query ? this.query : window.location.hash.split('?')[1];
    this.page = window.location.hash.split('=')[1] ? window.location.hash.split('=')[1] : 1;
    this.pageNumber = document.querySelector(`.current-page`);
    this.nextBtn = document.querySelector(`.btn-next`);
    this.prevBtn = document.querySelector(`.btn-prev`);
    this.pageTitle = document.querySelector(`.page-title`);
    this.filmList = document.querySelector(`.page-main__films-list`);
    this.searchForm = document.querySelector(`.search__form`);
    this.searchInput = document.querySelector(`.search__input`);

    this.pageNumber.innerHTML = this.page;

    if (window.location.href.indexOf('search') > -1) {
      this.getSearchedFilms(this.query, this.page);
    }

    this.bindEvents();
  },
  bindEvents: function() {
    this.searchForm.addEventListener(`submit`, this.submitSearch.bind(this));
    this.searchInput.addEventListener(`input`, this.getSearchQuery.bind(this));
    this.nextBtn.addEventListener(`click`, this.nextPage.bind(this));
    this.prevBtn.addEventListener(`click`, this.prevPage.bind(this));
  },
  submitSearch: function(e) {
    e.preventDefault();
    this.getSearchPage();
  },
  getSearchPage: function() {
    if (this.query !== undefined) {
      window.location = `#search?${this.query}`
      // history.pushState(null, null, `/search?${this.query}`);
      // navigation.generateHome();
      location.reload();
    }
  },
  getSearchedFilms: function(query, page) {
    this.pageTitle.innerText = `Результат поиска:`;
    this.searchInput.value = ``;

    FETCH_FILMS.searchFilms(query, page).then(data => {
      this.pageNumber.innerHTML = page;
      utils.clearMarkup(this.filmList);
      utils.putTemplates(
        this.filmList,
        utils.getTemplates(data.results, cardTemplate),
      );
      utils.defaultPoster();

      if (data.results.length === 0) {
        this.filmList.innerText = 'Фильмов нет, но вы держитесь!'
      }
      if (page <= 1) {
        this.prevBtn.setAttribute('disabled', '');
      } else {
        this.prevBtn.removeAttribute('disabled');
      }

      if (page === data.total_pages) {
        this.nextBtn.setAttribute('disabled', '');
      }

      if (data.total_pages <= 20) {
        this.prevBtn.setAttribute('disabled', '');
        this.nextBtn.setAttribute('disabled', '');
      } else {
        this.nextBtn.removeAttribute('disabled');
      }
    });
  },
  getSearchQuery: function(e) {
    return (this.query = e.target.value);
  },
  generateAnotherPage: function() {
    utils.clearMarkup(this.filmList);
    window.scrollTo(0, 0);
    this.prevBtn.removeAttribute('disabled');
    this.pageNumber.innerHTML = this.page;

    if (window.location.href.indexOf('search') > -1) {
      this.getSearchedFilms(this.query, this.page);
      window.location = `#search?${this.query}?page=${this.page}`
    }
  },
  nextPage: function() {
    this.page++;
    this.generateAnotherPage();
  },
  prevPage: function() {
    this.page--;
    this.generateAnotherPage();
  },
};
