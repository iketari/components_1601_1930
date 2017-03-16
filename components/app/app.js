(function () {
	'use strict';

	//import
	const Chat = window.Chat;
	const Form = window.Form;
	const AvatarService = window.AvatarService;
	const ChatService = window.ChatService;

	const chatService = new ChatService({
		baseUrl: 'https://components-1601-1930.firebaseio.com/chat/messages.json'
	});

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
				avatarService: new AvatarService,
				chatService,
				data: {
					messages: [],
					user: null
				}
			});

			this.form = new Form({
				el: document.createElement('div')
			});
		}

		_initMediate () {
			this.form.on('message', (event) => {
				let data = event.detail;

				data = {
					text: data.message.value,
					name: this.chat.getUsername()
				};

				chatService.sendMessage(data, () => {
					console.log('NEW MSG');
				});

				this.chat.addOne(data);

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
