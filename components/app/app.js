(function () {
	'use strict';

	//import
	const Chat = window.Chat;
	const Form = window.Form;
	const DigitalClock = window.DigitalClock;

	class App {
		constructor({el, head}) {
			this.el = el;
			this.head = head;			

			this._createComponents();
			this._initMediate();

			this.head.appendChild(this.clock.style);
			this.el.appendChild(this.clock.el);
			this.el.appendChild(this.chat.el);
			this.el.appendChild(this.form.el);
		}

		_createComponents() {
			this.clock = new DigitalClock({
				path: 'components'
			});

			this.chat = new Chat({
				el: document.createElement('div')
			});

			this.form = new Form({
				el: document.createElement('div')				
			});
		}

		_initMediate() {
			this.form.onSubmit((data) => {
				this.chat.addMessage(data);
			});

			this.chat.onScrollStart(() => {
				this.form.disable();
			});

			this.chat.onScrollEnd(() => {
				this.form.enable();
			});
		}

		// methods
	}

	//export
	window.App = App;
})();