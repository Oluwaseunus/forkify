import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
	if (title.length > limit) {
		const newTitle = [];
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) newTitle.push(cur);
			return acc + cur.length;
		}, 0);
		return `${newTitle.join(' ')} ...`;
	}
	return title;
};

const renderRecipe = recipe => {
	const markup = `
		<li>
			<a class="results__link results__link" href="#${recipe.recipe_id}">
					<figure class="results__fig">
							<img src="${recipe.image_url}" alt="${recipe.title}">
					</figure>
					<div class="results__data">
							<h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
							<p class="results__author">${recipe.publisher}</p>
					</div>
			</a>
	</li>
	`;
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
	<button class="btn-inline results__btn--${type}" data-goto=${
	type === 'prev' ? page - 1 : page + 1
}>
	<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
	<svg class="search__icon">
		<use href="img/icons.svg#icon-triangle-${
			type === 'prev' ? 'left' : 'right'
		}"></use>
	</svg>
	</button>
`;

const renderButtons = (page, numResults, count) => {
	const pages = Math.ceil(numResults / count);
	let button;

	if (page === 1) {
		// Only button to next page
		button = createButton(page, 'next');
	} else if (page < pages) {
		// Both buttons
		button = `
			${createButton(page, 'next')}
			${createButton(page, 'prev')}
		`;
	} else if (page === pages && pages > 1) {
		// Only button to previous page if more than one page
		button = createButton(page, 'prev');
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, count = 10) => {
	// render results of current page
	const start = (page - 1) * count;
	const end = page * count;

	recipes.slice(start, end).forEach(renderRecipe);

	// render pagination buttons
	renderButtons(page, recipes.length, count);
};
