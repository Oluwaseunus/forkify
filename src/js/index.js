import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

/**
 * App Order
 * - State
 * - Event listener methods
 * - Event listeners
 */

/**
 * Global state of the app.
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

const controlSearch = async e => {
	e.preventDefault();
	// 1. Get the query from the view.
	const query = searchView.getInput();

	// 2. If there is a query, create a new Search object and add it to state
	if (query) {
		state.search = new Search(query);

		// 3. Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		// 4. Get results
		await state.search.getResults();

		// 5. Render results
		clearLoader();
		searchView.renderResults(state.search.result);
	}
};

const controlPagination = e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
};

elements.searchForm.addEventListener('submit', controlSearch);
elements.searchResPages.addEventListener('click', controlPagination);

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = e => {
	const id = window.location.hash;
	console.log(id);
};

window.addEventListener('hashchange', controlRecipe);
