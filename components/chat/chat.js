(function () {
	'use strict';

	class Chat {
		constructor(options) {
			this.el = options.el;

			this.el.innerHTML = '<h3>Я чатик</h3>';
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