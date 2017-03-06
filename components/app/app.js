(function () {
  'use strict';

  //import
  const Chat = window.Chat;
  const Form = window.Form;
  const Wrapper = window.Wrapper;
  
  class App {
    constructor(options) {
	  this.el = options.el; 
         
	  this._createComponents();
	  this._initMediate();  
      
      this.el.appendChild(this.wrapper.el);
	  this.wrapper.el.appendChild(this.chat.el);
	  this.wrapper.el.appendChild(this.form.el);
	}
    
	_createComponents() {
      this.wrapper = new Wrapper({
	  	el: document.createElement('div')
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