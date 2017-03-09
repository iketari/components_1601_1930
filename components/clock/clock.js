(function () {
  'use strict';

  class Clock {
      /**
       * @param {Object} options
       * @param {HTMLElement} options.el
       */
      constructor ({el}) {
        this.el = el;

        const mapSelectors = {
            hours: 'hours',
            mins: 'mins',
            secs: 'secs',
            controlsBtns: 'buttons_controls',
            coloredBtns: 'buttons_colors',
            addNewBtn: 'btn_addnew'
        };

        Object.keys(mapSelectors).forEach((item) => {
            this[item] = this.el.querySelector(`.clock__${mapSelectors[item]}`);
        });

        ['_onControlClick', '_onClickLog', '_onElClick', '_onColorBtnClick']
            .forEach((item) => {
                this[item] = this[item].bind(this)
            });

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
      _onColorBtnClick ({target}) {
        if (target === this.addNewBtn) {
          this._addColoredBtn();
        } else {
          this.el.style.backgroundColor = target.textContent;
        }
      }

      _onElClick ({target, currentTarget}) {
        console.log('Клик пришелся по элементу: ', target,
          'Но обработчик события установлен на: ', currentTarget);
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
