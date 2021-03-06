export const elements = {
	searchForm: document.querySelector('.search'),
	searchRes: document.querySelector('.results'),
	searchInput: document.querySelector('.search__field'),
	searchResList: document.querySelector('.results__list'),
	searchResPages: document.querySelector('.results__pages')
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) loader.parentNode.removeChild(loader);
};

export const elementStrings = {
	loader: 'loader'
};

export const renderLoader = parent => {
	const loader = `
		<div class=${elementStrings.loader}>
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`;
	parent.insertAdjacentHTML('afterbegin', loader);
};
