import icons from 'url:../../img/icons.svg';

export class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  update(data) {
    if (!data) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' &&
        curEl
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        for (let i = 0; i < newEl.attributes.length; i++) {
          const attribute = newEl.attributes[i];
          curEl?.setAttribute(attribute.name, attribute.value);
        }
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}.svg#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}
