(function () {
	'use strict';

	//import
	const tmpl = window.chat_tmpl;

	/**
	 * @typedef {Object} ChatData
	 *
 	 * @property {string} user - имя текущего пользователя
 	 * @property {Array<ChatMessage>} messages - масси сообщений в чате
	 */

	/**
	 * @typedef {Object} ChatMessage
	 *
 	 * @property {string} text - Текст сообщения
 	 * @property {string} name - имя отправителя сообщения
	 */

	class Chat {
		constructor({
				el,
				data = {messages: []},
				avatarService,
				chatService
			}) {
			this.el = el;
			this.data = data;

			this.avatarService = avatarService;
			this.chatService = chatService;

			this._initEvents();

			this._init();
		}

		_initEvents () {
			this.el.addEventListener('change', (event) => {

				if (event.target.classList.contains('chat__userinput')) {
					this.data.user = event.target.value;
					this.render();
				}
			})
		}

		_init () {
			this.startPolling();
			
		}

		startPolling () {
			this.__pollingID = setInterval(() => {

				if (!this.data.user) {
					return;
				}

				this.chatService.getMessages(data => {
					console.log('getMessages', data);

					this.set(data);
					this.render();

				});
			}, 4000);
		}

		stopPolling () {
			clearInterval(this.__pollingID);
		}

		render () {
			this.el.innerHTML = tmpl(this.getData());
		}

		getData () {
			this._updateAvatars();
			this._updateMessages();

			return this.data;
		}

		getUsername () {
			return this.data.user;
		}

		_updateMessages () {
			this.data.messages = this.data.messages.reverse();
		}

		_updateAvatars () {
			this.data.messages.forEach(message => {
				message.avatar = this.avatarService.getAvatar(message.name);
			});
		}

		/**
		 * Устанавливает текущего пользователя
		 * @param {string} name
		 */
		setUser (name) {
			this.data.user = name;
		}

		set (messages = []) {
			this.data.messages.length = 0;
			this.add(messages);
		}

		/**
		 * Массовое добавление сообщений
		 * @param {Array<ChatMessages>} messages
		 */
		add (messages = []) {
			let addOneMessageMethod = this.addOne.bind(this);

			messages.forEach(addOneMessageMethod);
		}

		/**
		 * Добавить новое сообщение в чат
		 * @param {ChatMessage} data
		 */
		addOne ({avatar, name, text}) {
			this.data.messages.push({
				avatar,
				name,
				isMine: name === this.data.user,
				text,
				date: new Date()
			});
		}

		onScrollStart (cb) {
			console.info('Метод onScrollStart не реализован');
		}

		onScrollEnd (cb) {
			console.info('Метод onScrollEnd не реализован');
		}

		/**
		 * Устанавливаем текущего юзера
		 */
		setUserName (name) {
			this.data.user = name;
		}

	}


	//export
	window.Chat = Chat;
})();
