(function () {
  'use strict';

  class Clock {
      constructor (opts) {
        this.el = opts.el;

        this.hours = this.el.querySelector('.clock__hours');
        this.mins = this.el.querySelector('.clock__mins');
        this.secs = this.el.querySelector('.clock__secs');

        this.start();
      }

      start () {
        setInterval(() => {
          let date = new Date();

          this.hours.innerHTML = date.getHours();
          this.mins.innerHTML = date.getMinutes();
          this.secs.innerHTML = date.getSeconds();
        }, 1000);
      }

  }

  // export
  window.Clock = Clock;

})();
