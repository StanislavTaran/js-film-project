import FETCH_FILMS from './api/FETCH_FILMS';
import cardTemplate from '../templates/card.hbs';
import filmInfo from '../js/card';

export default {
  init: function() {
    this.filmList = document.querySelector(`.page-main__films-list`);
    this.watchedFilms = document.querySelector(
      `.page-main__films-list--watched`,
    );

    this.build();
    filmInfo.init();
    this.getTrigger();
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
            this.putTemplates(this.watchedFilms, cardTemplate(data));
          });
        }
      });
  },
  getTrigger: function() {
    const jsTriggers = document.querySelectorAll('.js-tab-trigger');

    jsTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        const id = this.getAttribute('data-tab');
        const content = document.querySelector(
          '.js-tab-content[data-tab="' + id + '"]',
        );
        const activeTrigger = document.querySelector('.js-tab-trigger.active');
        const activeContent = document.querySelector('.js-tab-content.active');

        activeTrigger.classList.remove('active');
        trigger.classList.add('active');

        activeContent.classList.remove('active');
        content.classList.add('active');
      });
    });
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
};
