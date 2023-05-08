// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, isStarted: false}

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    const {minutes, seconds} = this.state
    const isTimeCompleted = seconds === minutes * 60

    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  changeState = () => {
    const {isStarted, minutes, seconds} = this.state
    const timeCompleted = seconds === minutes * 60

    if (timeCompleted) {
      this.setState({seconds: 0})
    }
    if (isStarted) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.startTimer, 1000)
    }

    this.setState(prevState => ({
      isStarted: !prevState.isStarted,
    }))
  }

  resetClicked = () => {
    this.clearTimeInterval()
    this.setState({isStarted: false, minutes: 25, seconds: 0})
  }

  decreaseTime = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  increaseTime = () => {
    const {minutes} = this.state
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const totalRemainingSeconds = minutes * 60 - seconds
    const totalMinutes = Math.floor(totalRemainingSeconds / 60)
    const totalSeconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes =
      totalMinutes > 9 ? totalMinutes : `0${totalMinutes}`
    const stringifiedSeconds =
      totalSeconds > 9 ? totalSeconds : `0${totalSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStarted, minutes, seconds} = this.state
    const timerState = isStarted ? 'Running' : 'Paused'
    const stateUrl = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const stateAlt = isStarted ? 'pause icon' : 'play icon'
    const stateText = isStarted ? 'Pause' : 'Start'
    const isDisabled = seconds > 0

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>

        <div className="container">
          <div className="timer-container">
            <div className="white-cont">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-state">{timerState}</p>
            </div>
          </div>

          <div className="start-reset-container">
            <div className="container1">
              <button
                className="play-button"
                type="button"
                onClick={this.changeState}
              >
                <img src={stateUrl} alt={stateAlt} className="play-or-pause" />
                <p className="color">{stateText}</p>
              </button>

              <button
                className="reset-button"
                type="button"
                onClick={this.resetClicked}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset"
                />
                <p className="color">Reset</p>
              </button>
            </div>
            <p className="timer-limit">Set Timer limit</p>
            <div className="buttons-container">
              <button
                type="button"
                onClick={this.decreaseTime}
                disabled={isDisabled}
                className="button"
              >
                -
              </button>
              <p className="timer">{minutes}</p>
              <button
                type="button"
                onClick={this.increaseTime}
                disabled={isDisabled}
                className="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
