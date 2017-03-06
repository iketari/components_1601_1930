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

        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);

        this._initEvents();
      }

      /**
       * Установка обработчиков событий
       * @private
       */
      _initEvents () {
        this.stopEl.addEventListener('click', this._onStopClick);
        this.startEl.addEventListener('click', this._onStartClick);

        this.el.addEventListener('mouseover', this._onMouseOver); 
        this.el.addEventListener('mouseout', this._onMouseOut); 
      }

      /**
       * Отображение подсказок
       * @param  {MouseEvent} event
       */
      _onMouseOver (event) {
        let target = event.target;
        let tooltip = target.getAttribute('data-tooltip');
        if (!tooltip) return;

        let elem = document.createElement('div');
        elem.innerHTML = tooltip;
        elem.classList.add('clock_tooltip');
        this.el.appendChild(elem);          

        let rect = target.getBoundingClientRect();
        let top = rect.top - elem.offsetHeight - 5;
        if (top < 0) {
          top = rect.top + target.offsetHeight + 5;
        }
        
        let left = rect.left - (elem.offsetWidth - target.offsetWidth)/2;
        if (left < 0) left = 0;

        elem.style.top = top + 'px';
        elem.style.left = left + 'px';        
                
      }

      /**
       * Удаление подсказок
       * @param  {MouseEvent} event
       */
      _onMouseOut (event) {
        let target = event.target;
        let tooltip = target.getAttribute('data-tooltip');
        if (!tooltip) return;

        let elem = this.el.querySelector('.clock_tooltip');
        elem.remove();
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
