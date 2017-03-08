(function () {
    'use strict';

    class DigitalClock {
        constructor({ path }) {
            let stylePath = `${path}/digitalClock/clock.css`;
            this.style = document.createElement('link');
            this.style.setAttribute('rel', 'stylesheet');
            this.style.setAttribute('href', stylePath);

            this.el = document.createElement('div');
            this.el.classList.add('clock');

            this.start();
        }


        /**
         * Установить текущее время
         */
        setCurrentTime() {
            this.el.innerHTML = this.getTime(new Date());
        }

        /**
         * стартовать часики
         */
        start() {
            this.setCurrentTime();
            this._tid = setInterval(() => {
                this.setCurrentTime();
            }, 1000);
        }

        /**
         * Получить вермя в формате HH:MM:SS
         * @param  {Date} date
         */
        getTime(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            if (hours < 10) { hours = '0' + hours; }
            if (minutes < 10) { minutes = '0' + minutes; }
            if (seconds < 10) { seconds = '0' + seconds; }
            return hours + ':' + minutes + ':' + seconds;
        }
    }

    // export
    window.DigitalClock = DigitalClock;

})();
