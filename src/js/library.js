export default {
  init: function() {
    this.mainPage = document.querySelector(`.js-home`);
    this.filmList = document.querySelector(`.page-main__films-list`);
    this.pagination = document.querySelector(`.pagination`);
    this.pageTitle = document.querySelector(`.page-title`);

    this.clearMarkup();
  },
  bindEvents: function() {},
  clearMarkup: function() {
    this.filmList.parentNode.removeChild(this.filmList);
    this.pagination.parentNode.removeChild(this.pagination);
    this.pageTitle.innerText = `Моя библиотека`;
    this.putTemplates(this.mainPage, '<ul class="page-main__films-list"></ul>');
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
};
