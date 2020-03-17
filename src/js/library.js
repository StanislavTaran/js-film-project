import FETCH_FILMS from './api/FETCH_FILMS';
import cardTemplate from '../templates/card.hbs';
import filmInfo from '../js/card';
import utils from './utils';
import card from './card';

export default {
  init: function() {
    this.filmList = document.querySelector(`.page-main__films-list`);
    this.watchedFilms = document.querySelector(
      `.page-main__films-list--watched`,
    );
    this.queuedFilms = document.querySelector(`.page-main__films-list--queued`);

    this.build('watchedFilms', this.watchedFilms);
    this.build('queuedFilms', this.queuedFilms);
    this.bindEvents();
    filmInfo.init();
    this.getTrigger();
  },
  bindEvents: function() {
    this.queuedFilms.addEventListener(
      'click',
      card.generateFilmInfoPage.bind(card),
    );
    // window.onload = utils.defaultPoster(this.filmList);
  },
  build: function(key, elem) {
    if (localStorage.getItem(key) !== null) {
      localStorage
        .getItem(key)
        .split(',')
        .forEach(item => {
          if (item !== ``) {
            FETCH_FILMS.filmInfo(item).then(data => {
              utils.putTemplates(elem, cardTemplate(data));
              utils.defaultPoster();
            });
          }
        });
    }
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
};
