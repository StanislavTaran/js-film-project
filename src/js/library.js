export default {
  init: function() {
    this.mainPage = document.querySelector(`.js-home`);
    this.filmList = document.querySelector(`.page-main__films-list`);

    this.clearMarkup();
  },
  bindEvents: function() {},
  clearMarkup: function() {
    this.filmList.innerHTML = `hello`;
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
};
