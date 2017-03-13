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
		addMessage ({avatar, name, text}) {
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
