(function () {
  'use strict';

  class Clock {
      constructor (opts) {
        this.el = opts.el;

        this.hours = this.el.querySelector('.clock__hours');
        this.mins = this.el.querySelector('.clock__mins');
        this.secs = this.el.querySelector('.clock__secs');

        this.controlsBtns = this.el.querySelector('.clock__buttons_controls');

        this.coloredBtns = this.el.querySelector('.clock__buttons_colors');
        this.addNewBtn = this.el.querySelector('.clock__btn_addnew');

        this._onControlClick = this._onControlClick.bind(this);

        this._onClickLog = this._onClickLog.bind(this);
        this._onElClick = this._onElClick.bind(this);
        this._onColorBtnClick = this._onColorBtnClick.bind(this);

        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);

        this._initEvents();
      }

      /**
       * Установка обработчиков событий
       * @private
       */
      _initEvents () {
        this.el.addEventListener('click', this._onElClick);

        this.coloredBtns.addEventListener('click', this._onColorBtnClick);
        this.controlsBtns.addEventListener('click', this._onControlClick);        

        this.el.addEventListener('mouseover', this._onMouseOver); 
        this.el.addEventListener('mouseout', this._onMouseOut); 
      }

      _onControlClick (event) {
        let el = event.target;
        let action = el.dataset.action;
        let method = `on${action}`;

        try {
          this[method](event);
        } catch (e) {
          console.log(`Нет метода ${method} в`, this);
        }
      }

      /**
       * Клик по цветной кнопке
       * @param {MouseEvent} event
       */
      _onColorBtnClick (event) {
        if (event.target === this.addNewBtn) {
          this._addColoredBtn();
        } else {
          this.el.style.backgroundColor = event.target.textContent;
        }
      }

      _onElClick (event) {
        console.log('Клик пришелся по элементу: ', event.target,
          'Но обработчик события установлен на: ', event.currentTarget);
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
      onstart (event) {
        event.preventDefault();

        this.start();
        this._onClickLog(event);
      }

      /**
       * Дейстиве при стопе часиков
       * @param  {MouseEvent} event
       */
      onstop (event) {
          event.preventDefault();

          this.stop();  
          this._onClickLog(event);
      }

      _addColoredBtn () {
        let color = prompt('Введите цвет', 'black');

        let btn = document.createElement('a');
        btn.classList.add('clock__btn');
        btn.textContent = color;

        this.coloredBtns.insertBefore(btn, this.addNewBtn);
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
