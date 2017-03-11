// jshint asi: true
;(function () {
  'use strict'

  let showButton = document.body.querySelector('.button__show-chat')
  let chatEl = document.body.querySelector('.chat')
  let chatLoginForm = document.body.querySelector('.chat-login')
  let modalChat = document.body.querySelector('.modal__chat')
  let chatLoginButton = document.body.querySelector('.chat__login-button')

  showButton.addEventListener('click', (e) => {
    e.preventDefault()

    let applyEl = e.target
    if (e.target.tagName !== 'BUTTON') applyEl = e.target.parentNode
    applyEl.innerHTML = applyEl.innerHTML === '<i class="fa fa-chevron-left"></i>' ? '<i class="fa fa-chevron-right"></i>' : '<i class="fa fa-chevron-left"></i>'
    chatEl.classList.toggle('column-25')
    chatEl.classList.toggle('column-0')
  })

  chatLoginButton.addEventListener('click', (e) => {
    e.preventDefault()

    modalChat.classList.remove('not-visible')
  })

  chatLoginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    modalChat.classList.add('not-visible')
  })

})()


