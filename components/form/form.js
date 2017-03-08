(function () {
	'use strict';

	class Form {
		constructor(options) {
			this.el = options.el;
		}

		render () {
			this.el.innerHTML = `
				<form>
					<input type="text" />
					<input type="button" value="Отправить" />
				</form>
			`;
		}
	
		onSubmit (cb) {

		}
		// methods
	}

	//export
	window.Form = Form;
})();