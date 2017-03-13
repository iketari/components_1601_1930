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
		constructor({el, data = {messages: []}}) {
			this.el = el;
			this.data = data;
		}

		render () {
			this.el.innerHTML = tmpl(this.data);
		}

		/**
		 * Добавить новое сообщение в чат
		 * @param {ChatMessage} data
		 */
		addMessage (data) {
			this.data.messages.push({
				avatar: 'http://i.imgur.com/FHMnsVNt.jpg',
				name: data.name || this.data.user,
				isMine: data.name === this.data.user,
				text: data.text,
				date: data.date || new Date()
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
