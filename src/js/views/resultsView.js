import PreviewView from './previewView.js';
import { View } from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'We could not find any recipe, please search for another recipe!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultsView();
