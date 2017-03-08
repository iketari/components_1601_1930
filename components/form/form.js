(function () {
	'use strict';

	class Form {
		constructor({ el }) {
			this.el = el;

			this.message = this.el.querySelector('.form__message');
			this.email = this.el.querySelector('.form__email_text');

			this.el.addEventListener('keypress', this._onKeyPress.bind(this));
		}

		/**
		 * Установка обработчика на отправку формы
		 * @param {function} action
		 */
		addActionOnSubmit(action) {
			this.el.addEventListener('submit', this.callAction(action));
		}

		/**
		 * Нажатие клавиши
		 * @param {KeyboardEvent} event
		 */
		_onKeyPress(event) {
			const enterKeyCode = 13;

			if (event.keyCode === enterKeyCode) {
				event.preventDefault();
				this.dispatchSubmit();
			}
		}

		/**
		 * Отправка формы
		 * @param {function} action
		 * @returns function
		 */
		callAction(action) {
			let self = this;

			return event => {
				event.preventDefault();

				let data = {
					email: self.email.value.trim(),
					text: self.message.value.trim()
				};
				action(data);
				self.message.value = '';
			};
		}

		/**
		 * Вызвать событие отправки формы
		 */
		dispatchSubmit() {
			let event = document.createEvent('HTMLEvents');
			event.initEvent('submit', true, true);
			this.el.dispatchEvent(event);
		}

		// methods
	}

	//export
	window.Form = Form;
})();