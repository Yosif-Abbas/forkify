import { async } from 'regenerator-runtime';
// config import
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      publisher: recipe.publisher,
    };
    state.bookmarks.forEach(bookmark => {
      if (state.recipe.id === bookmark.id) {
        console.log(bookmark);
        state.recipe = bookmark;
        return;
      }
    });
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  return state.search.results.slice(
    (page - 1) * state.search.resultsPerPage,
    page * state.search.resultsPerPage
  );
};

export const updateServings = function (num) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * num;
  });
  state.recipe.cookingTime =
    (state.recipe.cookingTime / state.recipe.servings) * num;
  state.recipe.servings = num;
};

const persistBookmarks = function () {
  const data = JSON.stringify(state.bookmarks);
  localStorage.setItem('bookmarks', data);
};

export const addBookmark = function (recipe) {
  state.recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  state.bookmarks.forEach((bookmark, i) => {
    if (id === bookmark.id) {
      state.bookmarks.splice(i, 1);
      state.recipe.bookmarked = false;
      persistBookmarks();
    }
  });
};

export const restoreBookmarks = function () {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  state.bookmarks = data;
};
