;(function () {
  'use strict'

  class Clock {
    constructor (opts) {
      this.el = opts.el

      this.hours = this.el.querySelector('.clock__hours')
      this.mins = this.el.querySelector('.clock__mins')
      this.secs = this.el.querySelector('.clock__secs')

      this.hoursArrow = this.el.querySelector('.clock__arrow-hours')
      this.minsArrow = this.el.querySelector('.clock__arrow-minutes')
      this.secsArrow = this.el.querySelector('.clock__arrow-seconds')

      this.stopEl = this.el.querySelector('.clock__reset')
      this.startEl = this.el.querySelector('.clock__start')
      this.pauseEl = this.el.querySelector('.clock__pause')

      this._onStopClick = this._onStopClick.bind(this)
      this._onStartClick = this._onStartClick.bind(this)
      this._onPauseClick = this._onPauseClick.bind(this)

      this._onStopEnter = this._onStopEnter.bind(this)
      this._onStopLeave = this._onStopLeave.bind(this)

      this._onStartEnter = this._onStartEnter.bind(this)
      this._onStartLeave = this._onStartLeave.bind(this)

      this._onPauseEnter = this._onPauseEnter.bind(this)
      this._onPauseLeave = this._onPauseLeave.bind(this)

      this._onClickLog = this._onClickLog.bind(this)

      this._tid = null
      this._pauseCounter = null
      this._pausedMoment = null
      this._tooltip = document.createElement('div')

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

      this.stopEl.addEventListener('mouseover', this._onStopEnter)
      this.stopEl.addEventListener('mouseout', this._onStopLeave)

      this.startEl.addEventListener('mouseover', this._onStartEnter)
      this.startEl.addEventListener('mouseout', this._onStartLeave)

      this.pauseEl.addEventListener('mouseover', this._onPauseEnter)
      this.pauseEl.addEventListener('mouseout', this._onPauseLeave)

      this.start()
    }

    /**
     * Удалить классы
     * @param  {String} className
     */
    _removeClass (className) {
      let elem = document.querySelector('.clock__controls')
      console.log(elem.children)
      ;[...elem.children].forEach((el) => {
        if (el.classList.contains(className)) {
          el.classList.remove(className)
        }
      })
    }

    /**
     * Логирование кликов
     * @param  {MouseEvent} event
     */
    _onClickLog (event) {
      console.log(`Нажата клавиша: ${event.target.textContent}`)
    }

    /**
     * Действие при старте часиков
     * @param  {MouseEvent} event
     */
    _onStartClick (event) {
      event.preventDefault()

      if (!event.target.classList.contains('disabled')) {
        this.start()
        this._onClickLog(event)
        this._removeClass('disabled')
        event.target.classList.add('disabled')
        this.hideTooltip()
      }
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


      if (!event.target.classList.contains('disabled')) {
        this.pause()
        this._onClickLog(event)
        this._removeClass('disabled')
        event.target.classList.add('disabled')
        this.hideTooltip()
      }
    }

    /**
     * Действие при ховере над резетом
     * @param  {MouseEvent} event
     */
    _onStopEnter (event) {
      event.preventDefault()

      this.showTooltip(event)
    }

    /**
     * Действие при уходе мышки с резета
     * @param  {MouseEvent} event
     */
    _onStopLeave (event) {
      event.preventDefault()

      this.hideTooltip()
    }

    /**
     * Действие при ховере над стартом
     * @param  {MouseEvent} event
     */
    _onStartEnter (event) {
      event.preventDefault()

      if (!event.target.classList.contains('disabled')) {
        this.showTooltip(event)
      }
    }

    /**
     * Действие при уходе мышки со старта
     * @param  {MouseEvent} event
     */
    _onStartLeave (event) {
      event.preventDefault()

      if (!event.target.classList.contains('disabled')) {
        this.hideTooltip()
      }
    }

    /**
     * Действие при ховере над паузой
     * @param  {MouseEvent} event
     */
    _onPauseEnter (event) {
      event.preventDefault()

      if (!event.target.classList.contains('disabled')) {
        this.showTooltip(event)
      }
    }

    /**
     * Действие при уходе мышки с паузы
     * @param  {MouseEvent} event
     */
    _onPauseLeave (event) {
      event.preventDefault()

      this.hideTooltip()
    }

    /**
     * Добавляет нули в представление времени
     * @param  {Number} num
     */
    _addZero (num) {
      if (num < 10) num = '0' + num
      return num
    }

    /**
     * Обновляет часики
     * @param  {Date Object} date
     */
    _updateClock (date) {
      this.hours.innerHTML = this._addZero(date.getHours())
      this.mins.innerHTML = this._addZero(date.getMinutes())
      this.secs.innerHTML = this._addZero(date.getSeconds())

      // this is for digit position test
      // this.hoursArrow.style.transform = `translateX(1px) rotate(${ 180 + 11 * 30 }deg)`

      this.hoursArrow.style.transform = `translateX(5px) rotate(${ 180 + date.getHours() * 30 + date.getMinutes() / 2 }deg)`
      this.minsArrow.style.transform = `translateX(4px) rotate(${ 180 + date.getMinutes() * 6 }deg)`
      this.secsArrow.style.transform = `rotate(${ 180 + date.getSeconds() * 6 }deg)`
    }

    start () {
      if (this._pausedMoment) {
        this._pauseCounter += Date.now() - this._pausedMoment
      }

      let date = new Date(Date.now() - this._pauseCounter)
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

    showTooltip (event) {
      const coords = event.target.getBoundingClientRect()
      const padding = 10

      this._tooltip.className = 'tooltip'
      this._tooltip.innerHTML = event.target.dataset.tooltip

      document.body.appendChild(this._tooltip)

      const maxHeight = coords.top + coords.height  + this._tooltip.offsetHeight + padding
      const leftOffset = coords.left + coords.width / 2 - this._tooltip.offsetWidth / 2

      if (maxHeight < window.innerHeight) {
        this._tooltip.style.top = coords.top + coords.height + padding
      } else {
        this._tooltip.style.top = coords.top - this._tooltip.offsetHeight - padding
      }

      this._tooltip.style.left = leftOffset
    }

    hideTooltip () {
      // setTimeout(() => {
        document.body.removeChild(this._tooltip)
      // }, 300)
    }
  }

  // export
  window.Clock = Clock

})()
