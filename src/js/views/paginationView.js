import { View } from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (this._data.page === 1) {
      if (numPage === this._data.page) {
        return;
      } else return this._renderRight(this._data.page + 1);
    } else if (this._data.page === numPage) {
      return this._renderLeft(this._data.page - 1);
    } else {
      return [
        this._renderRight(this._data.page + 1),
        this._renderLeft(this._data.page - 1),
      ].join('');
    }
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _renderRight(next) {
    return `
    <button data-goto="${next}" class="btn--inline pagination__btn--next">
      <span>Page ${next}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  _renderLeft(prev) {
    return `
    <button data-goto="${prev}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${prev}</span>
    </button>
    `;
  }
}

export default new PaginationView();
