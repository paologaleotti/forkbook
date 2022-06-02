import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";

import * as model from "./model.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import uploadView from "./views/uploadView.js";

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;

		recipeView.renderSpinner();

		resultsView.update(model.getSearchResultPage());

		await model.loadRecipe(id); // change state

		recipeView.render(model.state.recipe);

		bookmarksView.update(model.state.bookmarks);
	} catch (err) {
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	const query = searchView.getQuery();
	if (!query) return;

	try {
		resultsView.renderSpinner();

		await model.loadSearchResults(query);

		if (model.state.search.results.length === 0) throw new Error();

		// render FIRST time
		resultsView.render(model.getSearchResultPage());
		paginationView.render(model.state.search);
	} catch (err) {
		resultsView.renderError();
	}
};

const controlPagination = function (gotoPage) {
	// render NEW result
	resultsView.render(model.getSearchResultPage(gotoPage));

	// render NEW pagination buttons
	paginationView.render(model.state.search);
};

const controlServings = function (servings) {
	if (servings <= 0) return;

	model.updateServings(servings);

	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	try {
		if (!model.state.recipe.bookmarked) {
			model.addBookmark(model.state.recipe);
		} else {
			model.deleteBookmark(model.state.recipe.id);
		}

		recipeView.update(model.state.recipe);

		bookmarksView.render(model.state.bookmarks);

		if (model.state.bookmarks.length === 0) throw new Error();
	} catch (err) {
		bookmarksView.renderError("smile");
	}
};

const controlBookmars = function () {
	try {
		bookmarksView.render(model.state.bookmarks);
		if (model.state.bookmarks.length === 0) throw new Error();
	} catch (err) {
		bookmarksView.renderError("smile");
	}
};

const controlUploadRecipe = async function (newRecipe) {
	try {
		await model.uploadRecipe(newRecipe);
		recipeView.render(model.state.recipe);

		uploadView.toggleWindow();

		window.history.pushState(null, "", `#${model.state.recipe.id}`);
		bookmarksView.render(model.state.bookmarks);
	} catch (err) {
		console.log(err);
	}
};

const init = function () {
	bookmarksView.addHandlerRender(controlBookmars);
	model.initBookmarks();

	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerBookmark(controlAddBookmark);

	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);

	uploadView.addHandlerUpload(controlUploadRecipe);
};
init();
