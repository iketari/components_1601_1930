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
				el: document.createElement('div'),
				data: {
					messages: [],
					user: 'Tim'
				}
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

		addMessage (data) {
			this.chat.addMessage(data);
		}

	}

	//export
	window.App = App;
})();
