(function () {
	'use strict';

	//import
	const Chat = window.Chat;
	const Form = window.Form;
	const AvatarService = window.AvatarService;
	const ChatService = window.ChatService;


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
				this.chat.add(data.messages);
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
				avatarService: new AvatarService,
				chatService: new ChatService,
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


				this.chat.addOne({
					text: data.message.value,
					name: 'Tim'
				});
				this.chat.render();
				this.form.reset();
			});
		}

		addMessage (data) {
			this.chat.addOne(data);
		}

	}

	//export
	window.App = App;
})();
