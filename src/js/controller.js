import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import bookmarksView from './views/bookmarksView.js';
import addrecipeView from './views/addrecipeView.js';
//we are importing icons so that we can use them in javascript
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView.js';

import paginationView from './views/paginationView.js';
//const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

//if (module.hot) {
// module.hot.accept();
//}

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    //guard clause
    if (!id) return;

    recipeView.renderSpinner();//renders a loading animation
    //loading recipe
    await model.loadRecipe(id);
    //for temp check
    //const { recipe } = model.state;
    //rendering recipe

    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));

  paginationView.render(model.state.search);
};
const controlServing = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);

};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmarked(model.state.recipe.id);

  recipeView.render(model.state.recipe);
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    addrecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
    // Show loading spinner


    // Success message
    addrecipeView.renderMessage();
    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);
    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addrecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addrecipeView.renderError(err.message);
  };
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookMark(controlAddBookmark);
  addrecipeView.addHandlerUpload(controlAddRecipe);
}
init();