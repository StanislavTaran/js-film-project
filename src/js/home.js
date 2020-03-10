import FETCH_FILMS from './api/FETCH_FILMS';
import card from '../templates/card.hbs';

export default {
  init: function() {
    this.page;
    this.pageNumber = document.querySelector(`.current-page`);
    this.mainPage = document.querySelector(`.js-home`);
    this.nextBtn = document.querySelector(`.btn-next`);
    this.prevBtn = document.querySelector(`.btn-prev`);

    this.generateCards(this.page);
    this.bindEvents();
  },
  bindEvents: function() {
    this.nextBtn.addEventListener(`click`, this.nextPage.bind(this));
    this.prevBtn.addEventListener(`click`, this.prevPage.bind(this));
  },
  generateCards: function(page) {
    FETCH_FILMS.allFilms(page ? page : 1).then(data => {
      this.page = data.page;
      this.putTemplates(this.mainPage, this.getTemplates(data.results, card));

      if (this.page === 1) {
        this.prevBtn.setAttribute('disabled', '');
      }
    });
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
  clearMarkup: function() {
    this.mainPage.innerHTML = ``;
  },
  generateAnotherPage: function() {
    this.clearMarkup();
    window.scrollTo(0, 0);
    this.prevBtn.removeAttribute('disabled');
    this.pageNumber.innerHTML = this.page;
    this.generateCards(this.page);
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
