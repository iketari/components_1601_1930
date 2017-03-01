(function () {
  'use strict';

  class Clock {
      constructor (opts) {
        this.el = opts.el;

        this.hours = this.el.querySelector('.clock__hours');
        this.mins = this.el.querySelector('.clock__mins');
        this.secs = this.el.querySelector('.clock__secs');

        this.startButton = this.el.querySelector('.clock__start_button');
        this.startButton.onclick = this.start.bind(this);

        this.pauseButton = this.el.querySelector('.clock__pause_button');
        this.pauseButton.onclick = this.pause.bind(this);

        this.stopButton = this.el.querySelector('.clock__stop_button');
        this.stopButton.onclick = this.stop.bind(this);

        this.start();
      }

      start () {
        this.timerId = setInterval(() => {
          let date = new Date(); 

          this.hours.innerHTML = Clock.format(date.getHours());
          this.mins.innerHTML = Clock.format(date.getMinutes());
          this.secs.innerHTML = Clock.format(date.getSeconds());
        }, 1000);
      }
      
      pause () {       
        clearInterval(this.timerId);
      }


      stop () {
        this.hours.innerHTML = '00';
        this.mins.innerHTML = '00';
        this.secs.innerHTML = '00';
        
        clearInterval(this.timerId);
      }

      static format (num){
        let textNum = num + '';

        let resultStr = textNum;
        if(textNum.length < 2){
          resultStr = '0'.repeat((2 - textNum.length)) + textNum;
        }
        return resultStr;
      }
  }

  // export
  window.Clock = Clock;

})();
