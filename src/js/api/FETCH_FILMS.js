const baseUrl = `https://api.themoviedb.org/3/`;
const apiKey = `4c70739ab1bc7f2c582885ab460406ce`;

export default {
  allFilms(page) {
    const params = `movie/popular?language=ru-RU`;

    return fetch(
      baseUrl + params + `&api_key=${apiKey}` + `&page=${page}`,
    ).then(response => response.json());
  },
  filmInfo(id) {
    const params = `&language=ru-RU`;

    return fetch(
      baseUrl + `movie/${id}` + `?api_key=${apiKey}` + params,
    ).then(response => response.json());
  },
  searchFilms(query, page) {
    const params = `search/movie?language=ru-RU`;

    return fetch(
      baseUrl +
        params +
        `&api_key=${apiKey}` +
        `&query=${query}` +
        `&page=${page}`,
    ).then(response => response.json());
  },
};
