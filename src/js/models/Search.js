import axios from 'axios';
import { proxy, API_KEY } from '../config';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		try {
			const res = await axios(
				`${proxy}https://www.food2fork.com/api/search?key=${API_KEY}&q=${
					this.query
				}`
			);
			this.result = res.data.recipes;
			// console.log(this.result);
		} catch (error) {
			alert(error);
		}
	}
}
