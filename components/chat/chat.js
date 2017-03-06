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
      this.el.innerHTML = '<h3>Я чатик</h3>';
    }
    
    /**
    * Добавить новое сообщение в чат
    * @param {ChatMessage} data
    */
    addMessage (data) {
      // ...
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