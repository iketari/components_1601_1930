// jshint asi: true
;(function () {
  'use strict'

  const chat_tmpl = window.chat_tmpl

  const LoginForm = window.LoginForm
  const MessageList = window.MessageList
  const MessageForm = window.MessageForm

  class Chat {
    constructor (options) {
      this.el = options.el

      this.userName = window.sessionStorage.getItem('chatWidgetName') || null
      this.messages = JSON.parse(window.sessionStorage.getItem('chatHistory') || '[]')
      this.notification = new Audio('./chat/notification.mp3')
      this.sending = new Audio('./chat/sending.mp3')


      this.render()
      this._initComponents()
      this.el.appendChild(this.loginForm.el)

      this._initEvents()
    }

    render () {
      if (!this.messages.length && this.userName) {
        this._addMessage({
          text: `Привет, ${this.userName}!`,
          my: false
        })
        this.notification.play()
      }
      this.el.innerHTML = chat_tmpl({
        messages: this.messages,
        username: this.userName
      })
    }

    _initComponents () {
      this.loginForm = new LoginForm({
        el: document.createElement('div')
      })
      this.messageForm = new MessageForm({
        el: document.querySelector('.chat__form')
      })
    }

    _addMessage (data) {
      this.messages.unshift({ // unshift is no good
        text: data.text,
        my: data.my || false,
        date: new Date().getHours() + ':' + new Date().getMinutes()
      })
    }

    _botikAnswer () {
      setTimeout(() => {
        this._addMessage({
          text: `Расскажи мне что-нибудь`,
          my: false
        })
        this.render()
        this.notification.play()
      }, 1500)
    }

    _showHideChat (e) {
      e.preventDefault()

      let applyEl = e.target
      if (e.target.tagName !== 'BUTTON') applyEl = e.target.parentNode
      applyEl.innerHTML = applyEl.innerHTML === '<i class="fa fa-chevron-left"></i>' ? '<i class="fa fa-chevron-right"></i>' : '<i class="fa fa-chevron-left"></i>'

      this.el.classList.toggle('column-25')
      this.el.classList.toggle('column-0')

    }

    _initEvents () {
      this.chatShowHideButton = document.querySelector('.button__show-chat')
      this.chatLoginButton = this.el.querySelector('.chat__login-button')

      this.chatShowHideButton.addEventListener('click', this._showHideChat.bind(this))

      this.chatLoginButton.addEventListener('click', this.loginForm.toggleModal)

      this.loginForm.on('login', (e) => {
        this.userName = e.detail.username
        window.sessionStorage.setItem('chatWidgetName', this.userName)

        this.render()
      })

      this.messageForm.on('message', (e) => {
        console.log(e.detail.text)
        this._addMessage({
          text: e.detail.text,
          my: true
        })
        this.render()
        this._botikAnswer()
        this.sending.play()
      })

    }
  }

  window.Chat = Chat

})()
