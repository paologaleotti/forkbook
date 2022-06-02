import icons from "url:../../img/icons.svg";

import View from "./View";

class uploadView extends View {
	_parentElement = document.querySelector(".upload");

	_window = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnOpen = document.querySelector(".nav__btn--add-recipe");
	_btnClose = document.querySelector(".btn--close-modal");

	constructor() {
		super();
		this._addHandlerShowModal();
		this._addHandlerCloseModal();
	}

	toggleWindow() {
		this._overlay.classList.toggle("hidden");
		this._window.classList.toggle("hidden");
	}

	_addHandlerShowModal() {
		this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
	}

	_addHandlerCloseModal() {
		this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
	}

	addHandlerUpload(handler) {
		this._parentElement.addEventListener("submit", (event) => {
			event.preventDefault();
			const dataArr = [...new FormData(event.currentTarget)];
			const data = Object.fromEntries(dataArr);

			handler(data);
		});
	}

	_generateMarkup() {}
}
export default new uploadView();
