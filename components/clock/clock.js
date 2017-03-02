(function () {
  'use strict';

  class Clock {
      constructor (opts) {
        this.el = opts.el;

        this.hours = this.el.getElementsByClassName('hh');
        this.mins = this.el.getElementsByClassName('mm');
        this.secs = this.el.getElementsByClassName('ss');

        this.start();
      }

      start () {
        setInterval(() => {
          let date = new Date();
          this.hours[1].style.transform = "rotate("+date.getHours()*12+"deg)";
          this.hours[0].style.transform = "rotate("+date.getHours()*12+"deg)";

          this.mins[1].style.transform = "rotate("+date.getMinutes()*6+"deg)";
          this.mins[0].style.transform = "rotate("+date.getMinutes()*6+"deg)";

          this.secs[1].style.transform = "rotate("+date.getSeconds()*6+"deg)";
          this.secs[0].style.transform = "rotate("+date.getSeconds()*6+"deg)";

        }, 100);
      }

  }

  // export
  window.Clock = Clock;

})();
