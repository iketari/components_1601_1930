(function () {
  'use strict';

  class Clock {
      constructor (opts) {
        this.el = opts.el;
        this.hint = document.createElement('div');
        
        this.hours = this.el.querySelector('.clock__hours');
        this.mins = this.el.querySelector('.clock__mins');
        this.secs = this.el.querySelector('.clock__secs');
        this.msecs = this.el.querySelector('.clock__msecs');

        this.stopEl = this.el.querySelector('.clock__stop');
        this.startEl = this.el.querySelector('.clock__start');

        this._onStopClick = this._onStopClick.bind(this);
        this._onStartClick = this._onStartClick.bind(this);
        this._onClickLog = this._onClickLog.bind(this);
        
        this._mouseOver = this._mouseOver.bind(this);
        this._mouseOut = this._mouseOut.bind(this);
        
        this._initEvents();
      }

      /**
       * Установка обработчиков событий
       * @private
       */
      _initEvents () {
        this.stopEl.addEventListener('click', this._onStopClick);
        this.startEl.addEventListener('click', this._onStartClick);
        
        document.addEventListener('mouseover', this._mouseOver);
        document.addEventListener('mouseout', this._mouseOut);
      }
      
      /**
       * Подсказка при событии наведения
       * @param  {MouseEvent} event
       */
      _mouseOver(event) {
        let text = event.target.getAttribute('data-tooltip');
        
        if (text != null) {
          this.hint.classList.add("hint");
          this.hint.style.display = "block";
          this.hint.textContent = text;
          
          event.target.appendChild(this.hint);
        }
      }
    
      _mouseOut(event) {
        this.hint.style.display = "none";
      }
    
      /**
       * Логирование кликов!
       * @param  {MouseEvent} event
       */
      _onClickLog (event) {
        console.log(`Нажата клавиша: ${event.target.textContent}`);
      }

      /**
       * Действие при старте часиков
       * @param  {MouseEvent} event
       */
      _onStartClick (event) {
        event.preventDefault();

        this.start();
        this._onClickLog(event);
      }

      /**
       * Действие при стопе часиков
       * @param  {MouseEvent} event
       */
      _onStopClick (event) {
        event.preventDefault();
        
        this.stop();  
        this._onClickLog(event);
      }
      
      /**
       * Красивый вывод времени
       * @param  {date}
       * @returns {date}
       */
      _checkTime(time) {
        if (time < 10) return ("0" + time);
        return time;
      }
    
      _checkTimeMsecs(time) {
        if (time < 10) return ("00" + time);
        if (time < 100) return ("0" + time);
        return time;
      }

      start () {
        this._tid = setInterval(() => {
          let date = new Date();

          this.hours.innerHTML = this._checkTime.call(this, date.getHours());
          this.mins.innerHTML = this._checkTime.call(this, date.getMinutes());
          this.secs.innerHTML = this._checkTime.call(this, date.getSeconds());
          this.msecs.innerHTML = this._checkTimeMsecs.call(this, date.getMilliseconds());
        }, 100);
      }

      stop () {
        clearInterval(this._tid);
      }
  }

  // export
  window.Clock = Clock;

})();
