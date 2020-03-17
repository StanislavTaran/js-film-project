import FETCH_FILMS from './api/FETCH_FILMS';
import cardTemplate from '../templates/card.hbs';
import filmInfo from './card';
import search from './search';
import utils from './utils';

export default {
  init: function() {
    this.page = window.location.hash.split('=')[1] ? window.location.hash.split('=')[1] : 1;
    this.pageNumber = document.querySelector(`.current-page`);
    this.nextBtn = document.querySelector(`.btn-next`);
    this.prevBtn = document.querySelector(`.btn-prev`);
    this.pageTitle = document.querySelector(`.page-title`);
    this.filmList = document.querySelector(`.page-main__films-list`);

    this.pageNumber.innerHTML = this.page;

    if (window.location.pathname === `/js-film-project/` && window.location.href.indexOf('search') === -1) {
      this.getAllFilms(this.page);
    }

    this.bindEvents();
    filmInfo.init();
    search.init();
  },
  bindEvents: function() {
    this.nextBtn.addEventListener(`click`, this.nextPage.bind(this));
    this.prevBtn.addEventListener(`click`, this.prevPage.bind(this));
  },
  getAllFilms: function(page) {
    FETCH_FILMS.allFilms(page ? page : 1).then(data => {
      this.pageNumber.innerHTML = page;
      utils.clearMarkup(this.filmList);
      utils.putTemplates(
        this.filmList,
        utils.getTemplates(data.results, cardTemplate),
      );
      utils.defaultPoster();

      if (page <= 1) {
        this.prevBtn.setAttribute('disabled', '');
      } else {
        this.prevBtn.removeAttribute('disabled');
      }

      if (page === data.total_pages) {
        this.nextBtn.setAttribute('disabled', '');
      }

      return data;
    });
  },
  generateAnotherPage: function() {
    utils.clearMarkup(this.filmList);
    window.scrollTo(0, 0);
    this.prevBtn.removeAttribute('disabled');
    this.pageNumber.innerHTML = this.page;

    if (window.location.pathname === `/js-film-project/` && window.location.href.indexOf('search') === -1) {
      this.getAllFilms(this.page);
      window.location = `#page=${this.page}`
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
