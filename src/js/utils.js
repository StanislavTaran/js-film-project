export default {
  putTemplates: function(ref, template) {
    ref.insertAdjacentHTML(`beforeend`, template);
  },
  clearMarkup: function(element) {
    element.innerHTML = ``;
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  defaultPoster: function() {
    const arrOfChildrens = document.querySelectorAll('.film-poster');

    arrOfChildrens.forEach(item => {
      if (item.src === 'http://image.tmdb.org/t/p/w300') {
        item.src = '../images/default.jpg';
      } else {
      }
    });
  },
};
