(function () {
	'use strict';

	//import
	const Chat = window.Chat;
	const Form = window.Form;

	class App {
		constructor(options) {
			this.el = options.el;

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
			this.form.onSubmit((data) => {
				this.chat.addMessage(data);
			});

			this.chat.onScrollStart(() => {
				this.form.disable();
			});

			this.chat.onScrollEnd(() => {
				this.form.enable();
			});
		}
	
		// methods
	}

	//export
	window.App = App;
})();