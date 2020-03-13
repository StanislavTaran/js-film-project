import FETCH_FILMS from './api/FETCH_FILMS';
import cardTemplate from '../templates/card.hbs';
import filmInfo from '../js/card';

export default {
  init: function() {
    this.mainPage = document.querySelector(`.js-home`);
    this.filmList = document.querySelector(`.page-main__films-list`);

    this.build();
    filmInfo.init();
  },
  bindEvents: function() {},
  build: function() {
    localStorage
      .getItem(`films`)
      .split(',')
      .forEach(item => {
        if (item !== ``) {
          FETCH_FILMS.filmInfo(item).then(data => {
            console.log(data);
            this.putTemplates(this.filmList, cardTemplate(data));
          });
        }
      });
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
};
