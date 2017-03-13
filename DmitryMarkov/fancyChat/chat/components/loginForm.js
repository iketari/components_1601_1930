// jshint asi: true
;(function () {
  'use strict'

  const modal_tmpl = window.modal_tmpl

  class LoginForm {
    constructor (options) {
      this.el = options.el

      this.render()

      this.showModal = this.showModal.bind(this)

      this._initEvents()
    }

    render () {
      this.el.innerHTML = modal_tmpl()
      // console.log(this.el)
    }

    showModal (e) {
      e.preventDefault()
      console.log('Join chat clicked')
      this.chatModal.classList.remove('not-visible')
    }

    _initEvents () {
      this.chatModal = this.el.querySelector('.modal__chat')
      // console.log(this.chatModal)
    }

  }

  window.LoginForm = LoginForm

})()
