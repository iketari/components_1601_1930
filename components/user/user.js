(function() {
  "use strict";
  
  class User {
    constructor() {
      this.name = this._getName();
    }
    
    _getName() {
      let tempName = prompt("Введите имя пользователя");
      
      if (tempName === null) return "Anon";
      return tempName;
    }
  }
  
  //export
  window.User = User;
})();