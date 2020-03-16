import FETCH_FILMS from './api/FETCH_FILMS';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';
import utils from './utils';

export default {
  init: function() {
    this.watchedFlag = false;
    this.queuedFlag = false;
    this.main = document.querySelector(`.page-main`);
    this.filmList = document.querySelector(`.page-main__films-list`);

    this.filmId = this.filmId
      ? this.filmId
      : window.location.hash.split('?')[1];

    this.bindEvents();
  },
  bindEvents: function() {
    this.filmList.addEventListener(
      `click`,
      this.generateFilmInfoPage.bind(this),
    );
  },
  getFilmId: function(event) {
    if (event.target.tagName === 'IMG') {
      this.filmId = event.target.dataset.id;
    } else if (event.target.tagName === 'P') {
      this.filmId = event.target.previousElementSibling.dataset.id;
    } else {
      this.filmId = undefined;
    }
  },
  getMovieData: function() {
    if (this.filmId) {
      utils.clearMarkup(navigation.main);
      FETCH_FILMS.filmInfo(this.filmId).then(data => {
        utils.putTemplates(this.main, filmInfoTemplate(data));
        this.addToLibrary();
        utils.defaultPoster();
      });
    } else return;
  },
  generateFilmInfoPage: function() {
    if (window.location.href.indexOf('movie') === -1) {
      this.getFilmId(event);
    }

    if (this.filmId !== undefined) {
      utils.clearMarkup(this.main);
      this.getMovieData();
      history.pushState(null, null, `#movie?${this.filmId}`);
    }
  },
  addToLibrary: function() {
    localStorage.setItem('watchedFilms', [navigation.watched]);
    localStorage.setItem('queuedFilms', [navigation.queued]);

    this.addToWatchBtn = document.querySelector(`#overlooked`);
    this.addToQueueBtn = document.querySelector(`#add-to-queue`);

    this.getLocalStorageWatchedData();
    this.getLocalStorageQueuedData();

    this.addToWatchBtn.addEventListener(
      `click`,
      this.toggleWatchedStatus.bind(this),
    );

    this.addToQueueBtn.addEventListener(
      `click`,
      this.toggleQueuedStatus.bind(this),
    );

    if (this.watchedFlag) {
      this.addToWatchBtn.innerText = 'Добавить';
      this.watchedFlag = false;
    } else {
      this.addToWatchBtn.innerText = 'Удалить';
      this.watchedFlag = true;
    }

    if (this.queuedFlag) {
      this.addToQueueBtn.innerText = 'Добавить';
      this.queuedFlag = false;
    } else {
      this.addToQueueBtn.innerText = 'Удалить';
      this.queuedFlag = true;
    }
  },
  addToLocalStorage: function(key, arr) {
    if (arr.length !== 0) {
      if (arr.indexOf(this.filmId) === -1) {
        arr.push(this.filmId);
        localStorage.setItem(key, [arr]);
      }
    } else {
      arr.push(this.filmId);
      localStorage.setItem(key, [arr]);
    }
  },
  removeFromLocalStorage: function(key, arr) {
    const index = arr.indexOf(this.filmId);

    arr.splice(index, 1);
    localStorage.setItem(key, arr);
  },
  getLocalStorageWatchedData: function() {
    if (localStorage.getItem('watchedFilms') !== null) {
      if (
        localStorage
          .getItem('watchedFilms')
          .split(',')
          .indexOf(this.filmId) > -1
      ) {
        this.watchedFlag = false;
      } else {
        this.watchedFlag = true;
      }
    }
  },
  getLocalStorageQueuedData: function() {
    if (localStorage.getItem('queuedFilms') !== null) {
      if (
        localStorage
          .getItem('queuedFilms')
          .split(',')
          .indexOf(this.filmId) > -1
      ) {
        this.queuedFlag = false;
      } else {
        this.queuedFlag = true;
      }
    }
  },
  toggleWatchedStatus: function() {
    if (this.watchedFlag) {
      this.addToWatchBtn.innerText = 'Добавить';
      this.watchedFlag = false;
      this.removeFromLocalStorage('watchedFilms', navigation.watched);
    } else {
      this.addToWatchBtn.innerText = 'Удалить';
      this.watchedFlag = true;
      this.addToLocalStorage('watchedFilms', navigation.watched);
    }
  },
  toggleQueuedStatus: function() {
    if (this.queuedFlag) {
      this.addToQueueBtn.innerText = 'Добавить';
      this.queuedFlag = false;
      this.removeFromLocalStorage('queuedFilms', navigation.queued);
    } else {
      this.addToQueueBtn.innerText = 'Удалить';
      this.queuedFlag = true;
      this.addToLocalStorage('queuedFilms', navigation.queued);
    }
  },
};
