// jshint asi: true
;(function () {
  'use strict'

  class MessageForm {
    constructor (options) {
      this.el = options.el
      this.messageTextarea = this.el.querySelector('#message')
      this._initEvents()
    }

    on (name, cb) {
			this.el.addEventListener(name, cb)
		}

    trigger (name, data) {
			let event = new CustomEvent(name, { detail: data })
			this.el.dispatchEvent(event)
		}

    reset (e) {
      // e.target.value = ''
      this.el.reset()
    }

    submitMessageForm (e) {
      // e.preventDefault()
      // console.log(e)
      if (e.charCode == 13 && e.shiftKey === false) {
        e.preventDefault()
        // console.log(e.target.value)
        this.trigger('message', { text: e.target.value })
        this.reset(e)
      }

      // this.trigger('message', { text: e.target.message.value })
    }

    _initEvents () {
      this.messageTextarea.addEventListener('keypress', this.submitMessageForm.bind(this))
    }
  }

  window.MessageForm = MessageForm

})()
