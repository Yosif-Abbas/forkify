import PreviewView from './previewView.js';
import { View } from './View.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet, find a nice recipe and bookmark it';
  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
