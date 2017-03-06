(function() {
  "use strict";
  
  class Wrapper {
    constructor(options) {
      this.el = options.el;
      
      this.el.classList.add("wrapper");
    }
  }
  
  //export
  window.Wrapper = Wrapper;
})();