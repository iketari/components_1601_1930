(function () {
    'use strict';

    class Clock {
        constructor(opts) {
            this.el = opts.el;
            this._timer = 0;
            this.hours = this.el.querySelector('.clock__hours');
            this.mins = this.el.querySelector('.clock__mins');
            this.secs = this.el.querySelector('.clock__secs');

            this.start();
            this.stop();
        }
        start() {
            this._timer = setInterval(() => this._render(), 1000);
        }

        _render() {
                let date = new Date();

                let h = date.getHours();
                let m = date.getMinutes();
                let s = date.getSeconds();
                if (h < 10) {
                    h = `0${h}`;
                }
                if (m < 10) {
                    m = `0${m}`;
                }
                if (s < 10) {
                    s = `0${s}`;
                }

                this.hours.innerHTML = h;
                this.mins.innerHTML = m;
                this.secs.innerHTML = s;
        };

        stop() {
            setTimeout(() => {
                clearTimeout(this._timer);
                this.hours.innerHTML = '00';
                this.mins.innerHTML = '00';
                this.secs.innerHTML = '00';
            }, 5000);

        };

    }

    // export
    window.Clock = Clock;

})();
