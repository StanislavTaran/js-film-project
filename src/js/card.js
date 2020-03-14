import FETCH_FILMS from './api/FETCH_FILMS';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';
import utils from './utils';

export default {
  init: function() {
    this.watchedFlag = false;
    this.main = document.querySelector(`.page-main`);
    this.filmList = document.querySelector(`.page-main__films-list`);

    this.filmId = this.filmId
      ? this.filmId
      : window.location.search.split('?')[1];

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

        localStorage.setItem('films', [navigation.watched]);
        this.addToWatchBtn = document.querySelector(`#overlooked`);
        this.getLocalStorageData();
        this.addToWatchBtn.addEventListener(
          `click`,
          this.toggleBtnStatus.bind(this),
        );

        if (this.watchedFlag) {
          this.addToWatchBtn.innerText = 'Добавить';
          this.watchedFlag = false;
        } else {
          this.addToWatchBtn.innerText = 'Удалить';
          this.watchedFlag = true;
        }
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
      history.pushState(null, null, `/movie?${this.filmId}`);
    }
  },
  addToWatched: function() {
    if (navigation.watched.length !== 0) {
      if (navigation.watched.indexOf(this.filmId) === -1) {
        navigation.watched.push(this.filmId);
        localStorage.setItem('films', [navigation.watched]);
      }
    } else {
      navigation.watched.push(this.filmId);
      localStorage.setItem('films', [navigation.watched]);
    }
  },
  removeFromLocalStorage: function() {
    const storageData = localStorage.getItem(`films`);
    const index = navigation.watched.indexOf(this.filmId);

    navigation.watched.splice(index, 1);
    localStorage.setItem(`films`, navigation.watched);
  },
  getLocalStorageData: function() {
    if (localStorage.getItem('films') !== null) {
      if (
        localStorage
          .getItem('films')
          .split(',')
          .indexOf(this.filmId) > -1
      ) {
        this.watchedFlag = false;
      } else {
        this.watchedFlag = true;
      }
    }
  },
  toggleBtnStatus: function() {
    if (this.watchedFlag) {
      this.addToWatchBtn.innerText = 'Добавить';
      this.watchedFlag = false;
      this.removeFromLocalStorage();
    } else {
      this.addToWatchBtn.innerText = 'Удалить';
      this.watchedFlag = true;
      this.addToWatched();
    }
  },
  toggleBtnEvents: function() {
    if (this.watchedFlag) {
      this.addToWatchBtn.addEventListener(
        `click`,
        this.addToWatched.bind(this),
      );
    } else {
      this.addToWatchBtn.addEventListener(
        `click`,
        this.removeFromLocalStorage.bind(this, 'films'),
      );
    }
  },
};
