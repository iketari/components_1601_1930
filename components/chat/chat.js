(function () {
  'use strict';
    
  /**
  * @typedef {Object} ChatMessage
  *
  * @property {string} text - Текст сообщения
  * @property {string} email - Email отправителя сообщения
  */

  class Chat {
    constructor(options) {
      this.el = options.el;
      this.el.classList.add("chat");
    }
    
    /**
    * Добавить новое сообщение в чат
    * @param {ChatMessage} data
    */
    addMessage(data) {
      if (data.message) this.el.innerHTML += 
          `<p><b>${data.username}</b>: <span class="message-date">${data.submitted}</span><br>${data.message}</p>`;
    }
    
    onScrollStart (cb) {
      
    }
    
    onScrollEnd (cb) {
      
    }
    
    // methods
  }
  
  //export
  window.Chat = Chat;
})();