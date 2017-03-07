(function () {
  'use strict';

  class Form {
	constructor(options) {
      this.el = options.el;
      
      this.formNode = this._formElemsCreate();
      
      this._inits();
	}
	
    _formElemsCreate() {
      return {
        form: document.createElement("form"),
        fieldset: document.createElement("fieldset"),
        label: document.createElement("label"),
        textarea: document.createElement("textarea"),
        input: document.createElement("a")
      }
    }
    
    _setElemsAtts() {
      this.formNode.form.classList.add("form");
      this.formNode.fieldset.classList.add("fieldset");
      
      this.formNode.label.setAttribute("for", "commentField");
      this.formNode.label.textContent = "Add message";
      
      this.formNode.textarea.setAttribute("id", "commentField");
      this.formNode.textarea.setAttribute("placeholder", "Введите сообщение");
      
      this.formNode.input.classList.add("button");
      this.formNode.input.textContent = "Send";
    }
    
    _formCreate() {
      this.el.appendChild(this.formNode.form);
      
      this.formNode.form.appendChild(this.formNode.fieldset);
      
      this.formNode.fieldset.appendChild(this.formNode.label);
      this.formNode.fieldset.appendChild(this.formNode.textarea);
      this.formNode.fieldset.appendChild(this.formNode.input);
     }
    
    _inits() {
      this._setElemsAtts();
      this._formCreate();
    }
    
	onSubmit(cb) {
      this.formNode.input.addEventListener("click", () => {
        cb();
        this._clearTextarea.call(this);
      });
      
	}
    // methods
    
    getData(user) {
      let text = this.formNode.textarea.value;
      return {
        message: text,
        username: user.name,
        submitted: this._getDate()
      };
    }
    
    _clearTextarea() {
      this.formNode.textarea.value = null;
    }
    
    _getDate() {
      let options = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
      let date = new Date();
      
      return date.toLocaleString("ru", options);
    }
  }

  //export
  window.Form = Form;
})();