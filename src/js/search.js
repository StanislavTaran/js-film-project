import FETCH_FILMS from './api/FETCH_FILMS';
import card from '../templates/card.hbs';

export default {
  init: function() {
    this.query;
    this.page;
    this.pageNumber = document.querySelector(`.current-page`);
    this.searchPage = document.querySelector(`.js-search`);
    this.searchForm = document.querySelector(`.search__form`);
    this.searchInput = document.querySelector(`.search__input`);
    this.img = document.querySelector(`.poster-img`);
    this.nextBtn = document.querySelector(`.btn-next`);
    this.prevBtn = document.querySelector(`.btn-prev`);

    this.getSearchedFilms(this.query, this.page);
    this.bindEvents();
  },
  bindEvents: function() {
    this.searchForm.addEventListener(
      `submit`,
      this.getSearchedFilms.bind(this),
    );
    this.searchInput.addEventListener(`input`, this.getSearcQuery.bind(this));
    this.nextBtn.addEventListener(`click`, this.nextPage.bind(this));
    this.prevBtn.addEventListener(`click`, this.prevPage.bind(this));
  },
  getSearchedFilms: function(query, page) {
    FETCH_FILMS.searchFilms(query, page).then(data => {
      this.page = data.page;
      this.putTemplates(this.searchPage, this.getTemplates(data.results, card));

      if (this.page === 1) {
        this.prevBtn.setAttribute('disabled', '');
      }

      if (this.page === data.total_pages) {
        this.nextBtn.setAttribute('disabled', '');
      }

      if (data.total_pages <= 20) {
        this.prevBtn.setAttribute('disabled', '');
        this.nextBtn.setAttribute('disabled', '');
      }
    });
  },
  getSearcQuery: function(e) {
    this.query = e.target.value;
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
  clearMarkup: function() {
    this.searchPage.innerHTML = ``;
  },
  generateAnotherPage: function() {
    this.clearMarkup();
    window.scrollTo(0, 0);
    this.prevBtn.removeAttribute('disabled');
    this.pageNumber.innerHTML = this.page;
    this.getSearchedFilms(this.query, this.page);
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
