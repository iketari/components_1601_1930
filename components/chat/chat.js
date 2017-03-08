(function () {
	'use strict';

	/**
	 * @typedef {Object} ChatMessage
	 *
 	 * @property {string} text - Текст сообщения
 	 * @property {string} email - Email отправителя сообщения
	 */

	class Chat {
		constructor(options) {
			this.el = options.el;
		}

		render () {
			this.el.innerHTML = `
			<div class="chat">
				<div class="container">
				  <div class="header">
				    <h2>Чат</h2>
				  </div>
				  <div class="chat-box">
				    <div class="message-box left-img">
				      <div class="picture">
				        <img src="http://www.gravatar.com/avatar/453cb640b1f272fb50086052e0c9e013.png" title="user name"/>
				        <span class="time">10 mins</span>
				      </div>
				      <div class="message">
				        <span>Bobby Giangeruso</span>
				        <p>Hey Mike, how are you doing?</p>
				      </div>
				    </div>
				    <div class="message-box right-img">
				      <div class="picture">
				        <img src="http://www.gravatar.com/avatar/a58d2af91e41a2accfd8bcedcd7a427e.png" title="user name"/>
				        <span class="time">2 mins</span>
				      </div>
				      <div class="message">
				        <span>Mike Moloney</span>
				        <p>Pretty good, Eating nutella, nommommom</p>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
			`
		}

		/**
		 * Добавить новое сообщение в чат
		 * @param {ChatMessage} data
		 */
		addMessage (data) {
			// ...
		}

		onScrollStart (cb) {

		}

		onScrollEnd (cb) {

		}
	
		// methods
	}


	//export
	window.Chat = Chat;
})();