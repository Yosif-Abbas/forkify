// model import
import * as model from './model.js';
// views imports
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
// icons import
import icons from 'url:../img/icons.svg';

// other imports
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2
// 19533e44-91f8-4094-9b06-fc100fa37d0c

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    model.restoreBookmarks();
    bookmarkView.render(model.state.bookmarks);

    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // load recipe
    await model.loadRecipe(id);
    //render recipe
    recipeView.render(model.state.recipe);

    resultsView.update(model.getSearchResultsPage());

    bookmarkView.update(model.state.bookmarks);

    console.log(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    console.log(model.state.search.results);

    resultsView.render(model.getSearchResultsPage(model.state.search.page));

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (page) {
  model.state.search.page = page;
  resultsView.render(model.getSearchResultsPage(model.state.search.page));
  paginationView.render(model.state.search);
};

const controlServings = async function (num) {
  try {
    // modify recipe servings in model.state.recipe
    model.updateServings(num);
    // update recipe view
    recipeView.update(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const controlAddBookmark = function () {
  model.state.recipe.bookmarked
    ? model.deleteBookmark(model.state.recipe.id)
    : model.addBookmark(model.state.recipe);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

(function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
})();
