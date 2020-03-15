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
  defaultPoster: function(parent) {
    return setTimeout(() => {
      const arrOfChildrens = document.querySelectorAll('.film-poster');
      console.dir(parent);
      console.log(parent.children);
      console.log(arrOfChildrens);
      arrOfChildrens.forEach((item, idx) => {
        if (item.src === 'http://image.tmdb.org/t/p/w300') {
          console.log('no picture idx ' + idx);
          item.src = './images/default.jpg';
        } else {
        }
      });
    }, 600);
  },
};
