(function () {
	'use strict';

	class ChatService {

		constructor ({baseUrl}) {
			this.baseUrl = baseUrl;
		}

		_makeRequest (cb, type = 'GET', data = {}) {
			let xhr = new XMLHttpRequest();
			xhr.open(type, this.baseUrl, true);

			xhr.onload = () => {
				console.log('onload DATA:', JSON.parse(xhr.responseText));
				cb(JSON.parse(xhr.responseText));
			}

			xhr.send(JSON.stringify(data));
		}

		getMessages (cb) {
			this._makeRequest(cb);
		}

		sendMessage () {}
	
		// methods
	}

	//export
	window.ChatService = ChatService;
})();