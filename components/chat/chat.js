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

			this._getUserName();
		}

		render () {
			this.el.innerHTML = tmpl(this.data);
		}

		/**
		 * Добавить новое сообщение в чат
		 * @param {ChatMessage} data
		 */
		addMessage ({name, text, date = new Date()}) {
			this.data.messages.push({
				avatar: 'http://i.imgur.com/FHMnsVNt.jpg',
				name: name || this.data.user,
				text,
				date
			});
		}

		onScrollStart (cb) {
			console.info('Метод onScrollStart не реализован');
		}

		onScrollEnd (cb) {
			console.info('Метод onScrollEnd не реализован');
		}

		_getUserName () {
			//TODO: справшивать
			this.data.user = 'Tim';
		}

	}


	//export
	window.Chat = Chat;
})();
