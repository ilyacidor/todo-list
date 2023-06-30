import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onCheckSpaces = (e) => {
    if (e.target.value.charAt(0) === ' ') {
      e.target.value = ''
    }
  }

  onLabelChange = (e) => {
    this.onCheckSpaces(e)
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.onCheckSpaces(e)
    this.setState({
      minutes: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.onCheckSpaces(e)
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label, this.state.minutes, this.state.seconds)
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            required
            name="todo"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            min="0"
            max="59"
            step="1"
            placeholder="Min"
            autoFocus
            required
            name="minutes"
            onChange={this.onMinutesChange}
            value={this.state.minutes}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            min="0"
            max="59"
            step="1"
            placeholder="Sec"
            autoFocus
            required
            name="seconds"
            onChange={this.onSecondsChange}
            value={this.state.seconds}
          />
          <button type="submit" className="hidden"></button>
        </form>
      </header>
    )
  }
}
