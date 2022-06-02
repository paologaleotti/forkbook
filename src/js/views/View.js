import icons from "url:../../img/icons.svg";

export default class View {
	_data;

	_clear() {
		this._parentElement.innerHTML = "";
	}

	render(data) {
		this._data = data;
		this._clear();

		document;
		this._parentElement.insertAdjacentHTML(
			"afterbegin",
			this._generateMarkup()
		);
	}

	update(data) {
		this._data = data;
		const newMarkup = this._generateMarkup();

		const newDOM = document
			.createRange()
			.createContextualFragment(newMarkup);

		const newElements = Array.from(newDOM.querySelectorAll("*"));
		const curElements = Array.from(
			this._parentElement.querySelectorAll("*")
		);

		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];

			// replace text
			if (
				!newEl.isEqualNode(curEl) &&
				newEl.firstChild?.nodeValue.trim() !== ""
			) {
				curEl.textContent = newEl.textContent;
			}

			//replace data attributes
			if (!newEl.isEqualNode(curEl)) {
				Array.from(newEl.attributes).forEach((attr) =>
					curEl.setAttribute(attr.name, attr.value)
				);
			}
		});
	}

	renderSpinner() {
		const markup = `
			<div class="spinner">
				<svg>
					<use href="${icons}#icon-loader"></use>
				</svg>
			</div>`;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderError(icon = "alert-triangle", msg = this._errorMessage) {
		const markup = `
		<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-${icon}"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}
