(function () {
	'use strict';

	//import
	const tmpl = window.chat_tmpl;

	/**
	 * @typedef {Object} ChatMessage
	 *
 	 * @property {string} text - Текст сообщения
 	 * @property {string} email - Email отправителя сообщения
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
		}

		render () {
			this.el.innerHTML = tmpl(this.getData());
		}

		getData () {
			this._updateAvatars();

			return this.data;
		}

		_updateAvatars () {
			this.data.messages.forEach(message => {
				message.avatar = this.avatarService.getAvatar(message.name);
			});
		}

		/**
		 * Массовое добавление сообщений
		 * @param {Array<ChatMessages>} messages
		 */
		add (messages = []) {
			messages.forEach(this.addOne.bind(this));
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
