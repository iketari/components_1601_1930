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
        console.log('Клик пришелся по элементу: ', event.target, 'Но обработчик события установлен на: ', event.currentTarget);
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
