(function () {
	'use strict';

	//import
	const Chat = window.Chat;
	const Form = window.Form;


	function makeRequest (cb) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/data/chat.json', true);

		xhr.onload = () => {
			console.log('onload DATA:', JSON.parse(xhr.responseText));
			cb(JSON.parse(xhr.responseText));
		}

		xhr.send();
		console.log('after send DATA:', xhr.responseText);
	}


	class App {
		constructor(options) {
			this.el = options.el;

			this._createComponents();
			this._initMediate();

			this.el.appendChild(this.chat.el);
			this.el.appendChild(this.form.el);

			makeRequest(data => {
				this.chat.data = data;
				this.render();
			});
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
