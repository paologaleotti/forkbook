class SearchView {
	_parentElement = document.querySelector(".search");

	addHandlerSearch(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	_clearInput() {
		this._parentElement.querySelector(".search__field").value = "";
	}

	getQuery() {
		const query = this._parentElement.querySelector(".search__field").value;

		this._clearInput();

		return query;
	}
}
export default new SearchView();
