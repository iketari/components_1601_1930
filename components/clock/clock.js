(function () {
  'use strict';

  class Clock {
      constructor (opts) {
        this.el = opts.el;

        this.hours = this.el.querySelector('.clock__hours');
        this.mins = this.el.querySelector('.clock__mins');
        this.secs = this.el.querySelector('.clock__secs');

        this.stopEl = this.el.querySelector('.clock__stop');
        this.startEl = this.el.querySelector('.clock__start');

        this._onStopClick = this._onStopClick.bind(this);
        this._onStartClick = this._onStartClick.bind(this);
        this._onClickLog = this._onClickLog.bind(this);

        this._initEvents();
      }

      /**
       * Установка обработчиков событий
       * @private
       */
      _initEvents () {
        this.stopEl.addEventListener('click', this._onStopClick);
        this.startEl.addEventListener('click', this._onStartClick); 
      }

      /**
       * Логирование кликов!
       * @param  {MouseEvent} event
       */
      _onClickLog (event) {
        console.log(`Нажата клвиша: ${event.target.textContent}`);
      }

      /**
       * Дейстиве при старте часиков
       * @param  {MouseEvent} event
       */
      _onStartClick (event) {
        event.preventDefault();

        this.start();
        this._onClickLog(event);
      }

      /**
       * Дейстиве при стопе часиков
       * @param  {MouseEvent} event
       */
      _onStopClick (event) {
          event.preventDefault();

          this.stop();  
          this._onClickLog(event);
      }

      start () {
        this._tid = setInterval(() => {
          let date = new Date();

          this.hours.innerHTML = date.getHours();
          this.mins.innerHTML = date.getMinutes();
          this.secs.innerHTML = date.getSeconds();
        }, 1000);
      }

      stop () {
        clearInterval(this._tid);
      }

  }

  // export
  window.Clock = Clock;

})();
