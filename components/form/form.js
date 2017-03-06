(function () {
	'use strict';

	class Form {
		constructor(options) {
			this.el = options.el;

			this.el.innerHTML = '<h3>Я форма</h3>';
		}
	
		onSubmit (cb) {

		}
		// methods
	}

	//export
	window.Form = Form;
})();