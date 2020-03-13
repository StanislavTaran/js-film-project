export default {
  init: function() {
    this.mainPage = document.querySelector(`.js-home`);
    this.filmList = document.querySelector(`.page-main__films-list`);
    this.pageTitle = document.querySelector(`.page-title`);
    this.pagination = document.querySelector(`.pagination`);

    this.clearMarkup();
  },
  bindEvents: function() {},
  clearMarkup: function() {
    this.filmList.innerHTML = `hello`;
    this.pageTitle.innerText = `Моя библиотека`;

    if (this.pagination) {
      this.pagination.parentNode.removeChild(this.pagination);
    }
  },
  getTemplates: function(obj, templates) {
    return obj.map(item => templates(item)).join(``);
  },
  putTemplates: function(ref, markup) {
    ref.insertAdjacentHTML(`beforeend`, markup);
  },
};
