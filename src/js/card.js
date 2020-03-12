import FETCH_FILMS from './api/FETCH_FILMS';
import homePage from '../js/home';
import { navigation } from './navigation';
import filmInfoTemplate from '../templates/filmInfo.hbs';

export default {
  init: function() {
    this.mainPoster = document.querySelector('.film-poster');
    this.filmId = null;
    this.bindEvents();
  },
  bindEvents: function() {
    homePage.filmList.addEventListener(
      `click`,
      this.generateFilmInfoPage.bind(this),
    );
  },
  getFilmId: function(event) {
    if (event.target.tagName === 'IMG') {
      this.filmId = event.target.dataset.id;
    } else if (event.target.tagName === 'P') {
      this.filmId = event.target.previousElementSibling.dataset.id;
    } else return;
    console.log(this.filmId);
  },
  getMovieData: function() {
    return new Promise((resolve, reject) => {
      resolve(
        fetch(
          'https://api.themoviedb.org/3/movie/' +
            this.filmId +
            '?api_key=4c70739ab1bc7f2c582885ab460406ce',
        )
          .then(res => {
            const data = res.json();
            console.log(data);
            return data;
          })
          .then(data => {
            navigation.putTemplates(navigation.main, filmInfoTemplate(data));
          }),
      );
    });
  },
  generateFilmInfoPage: function(e) {
    this.getFilmId(e);
    navigation.clearMarkup();
    history.pushState(null, null, `/movie?${this.filmId}`);

    this.getMovieData();
  },
};
window.addEventListener('change', () => {
  console.log('URL WAS CHANDES');
});
// if (window.location.pathname === `/movie`) {
//   this.putTemplates(this.main, homePageTemplate(this.main));
//   homePage.init();
// }
