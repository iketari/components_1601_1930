;(function () {
  'use strict'

  class Clock {
    constructor (opts) {
      this.el = opts.el

      this.hours = this.el.querySelector('.clock__hours')
      this.mins = this.el.querySelector('.clock__mins')
      this.secs = this.el.querySelector('.clock__secs')

      this.stopEl = this.el.querySelector('.clock__reset')
      this.startEl = this.el.querySelector('.clock__start')
      this.pauseEl = this.el.querySelector('.clock__pause')

      this._onStopClick = this._onStopClick.bind(this)
      this._onStartClick = this._onStartClick.bind(this)
      this._onPauseClick = this._onPauseClick.bind(this)
      this._onClickLog = this._onClickLog.bind(this)

      this._tid = null
      this._pauseCounter = null
      this._pausedMoment = null

      this._initEvents()
    }

    /**
     * Установка обработчиков событий и старт часов
     * @private
     */
    _initEvents () {
      this.stopEl.addEventListener('click', this._onStopClick)
      this.startEl.addEventListener('click', this._onStartClick)
      this.pauseEl.addEventListener('click', this._onPauseClick)

      this.start()
    }

    /**
     * Логирование кликов
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
      event.preventDefault()

      this.start()
      this._onClickLog(event)
    }

    /**
     * Действие при стопе часиков
     * @param  {MouseEvent} event
     */
    _onStopClick (event) {
      event.preventDefault()

      this.stop()
      this._onClickLog(event)
  }

    /**
     * Действие при паузе часиков
     * @param  {MouseEvent} event
     */
    _onPauseClick (event) {
      event.preventDefault()

      this.pause()
      this._onClickLog(event)
    }

    /**
     * Обновляет часики
     * @param  {Date Object} date
     */
    _updateClock (date) {
      this.hours.innerHTML = date.getHours()
      this.mins.innerHTML = date.getMinutes()
      this.secs.innerHTML = date.getSeconds()
    }

    start () {
      if (this._pausedMoment) {
        this._pauseCounter += Date.now() - this._pausedMoment
      }
      let date = new Date(Date.now() - this._pauseCounter)
      console.log(this._pauseCounter)
      this._updateClock(date)

      this._tid = setInterval(() => {
        let date = new Date(Date.now() - this._pauseCounter)
        this._updateClock(date)
      }, 1000)
    }

    stop () {
      clearInterval(this._tid)
      this._pauseCounter = null
      this._pausedMoment = null
      this.start()
    }

    pause () {
      clearInterval(this._tid)
      this._pausedMoment = Date.now()
    }

  }

  // export
  window.Clock = Clock

})()
