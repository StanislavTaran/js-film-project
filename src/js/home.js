import FETCH_FILMS from './api/FETCH_FILMS';
import cardTemplate from '../templates/card.hbs';
import filmInfo from './card';

export default {
  init: function() {
    this.query = this.query ? this.query : window.location.search.split('?')[1];
    this.page = 1;
    this.pageNumber = document.querySelector(`.current-page`);
    this.mainPage = document.querySelector(`.js-home`);
    this.nextBtn = document.querySelector(`.btn-next`);
    this.prevBtn = document.querySelector(`.btn-prev`);
    this.pageTitle = document.querySelector(`.page-title`);
    this.filmList = document.querySelector(`.page-main__films-list`);
    this.searchForm = document.querySelector(`.search__form`);
    this.searchInput = document.querySelector(`.search__input`);

    if (window.location.pathname === `/`) {
      this.getAllFilms(this.page);
    }

    if (window.location.href.indexOf('search') > -1) {
      this.getSearchedFilms(this.query, this.page);
    }

    this.bindEvents();
    filmInfo.init();
  },
  bindEvents: function() {
    this.searchForm.addEventListener(`submit`, this.getSearchPage.bind(this));
    this.searchInput.addEventListener(`input`, this.getSearchQuery.bind(this));
    this.nextBtn.addEventListener(`click`, this.nextPage.bind(this));
    this.prevBtn.addEventListener(`click`, this.prevPage.bind(this));
  },
  getAllFilms: function(page) {
    FETCH_FILMS.allFilms(page ? page : 1).then(data => {
      this.page = data.page;
      this.clearMarkup();
      this.putTemplates(
        this.filmList,
        this.getTemplates(data.results, cardTemplate),
      );

      if (this.page === 1) {
        this.prevBtn.setAttribute('disabled', '');
      }

      if (this.page === data.total_pages) {
        this.nextBtn.setAttribute('disabled', '');
      }

      this.pageTitle.innerText = `Популярные фильмы`;
    });
  },
  getSearchPage: function(e) {
    e.preventDefault();
    this.searchInput.value = '';

    if (this.query !== undefined) {
      history.pushState(null, null, `/search?${this.query}`);
      this.getSearchedFilms(this.query, 1);
    }
  },
  getSearchedFilms: function(query, page) {
    FETCH_FILMS.searchFilms(query, page).then(data => {
      this.page = data.page;
      this.clearMarkup();
      this.putTemplates(
        this.filmList,
        this.getTemplates(data.results, cardTemplate),
      );

      if (this.page === 1) {
        this.prevBtn.setAttribute('disabled', '');
      }

      if (this.page === data.total_pages) {
        this.nextBtn.setAttribute('disabled', '');
      }

      if (data.total_pages <= 20) {
        this.prevBtn.setAttribute('disabled', '');
        this.nextBtn.setAttribute('disabled', '');
      } else {
        this.nextBtn.removeAttribute('disabled');
      }

      this.pageTitle.innerText = `Результат поиска:`;
    });
  },
  getSearchQuery: function(e) {
    return (this.query = e.target.value);
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
  clearMarkup: function() {
    this.filmList.innerHTML = ``;
  },
  generateAnotherPage: function() {
    this.clearMarkup();
    window.scrollTo(0, 0);
    this.prevBtn.removeAttribute('disabled');
    this.pageNumber.innerHTML = this.page;

    if (window.location.href.indexOf('search') > -1) {
      this.getSearchedFilms(this.query, this.page);
    }

    if (window.location.pathname === `/`) {
      this.getAllFilms(this.page);
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
