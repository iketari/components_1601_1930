(function () {
	'use strict';

	//import
	const {Chat, Form} = window;

	class App {
		/**
		 * @param {Object} options
		 * @param {HTMLElement} options.el
		 */
		constructor({el}) {
			this.el = el;

			this._createComponents();
			this._initMediate();

			this.el.appendChild(this.chat.el);
			this.el.appendChild(this.form.el);

			this.render();
		}

		render () {
			this.chat.render();
			this.form.render();
		}

		_createComponents () {
			this.chat = new Chat({
				el: document.createElement('div')
			});

			this.form = new Form({
				el: document.createElement('div')
			});
		}

		_initMediate () {
			this.form.on('message', (event) => {
				let data = event.detail;


				this.chat.addMessage({
					text: data.message.value
				});
				this.chat.render();
				this.form.reset();
			});
		}

		// methods
	}

	//export
	window.App = App;
})();
