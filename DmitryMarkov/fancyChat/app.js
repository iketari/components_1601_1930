// jshint asi: true
;(function () {
  'use strict'

  let showButton = document.body.querySelector('.button__show-chat')
  let chatEl = document.body.querySelector('.chat')

  showButton.addEventListener('click', (e) => {
    e.preventDefault()

    let applyEl = e.target
    if (e.target.tagName !== 'BUTTON') applyEl = e.target.parentNode
    applyEl.innerHTML = applyEl.innerHTML === '<i class="fa fa-chevron-left"></i>' ? '<i class="fa fa-chevron-right"></i>' : '<i class="fa fa-chevron-left"></i>'
    chatEl.classList.toggle('hidden')
  })

})()
