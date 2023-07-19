import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

const NewTaskForm = ({ onItemAdded = () => {} }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onCheckSpaces = (e) => {
    if (e.target.value.charAt(0) === ' ') {
      e.target.value = ''
    }
  }

  const onLabelChange = (e) => {
    onCheckSpaces(e)
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    onCheckSpaces(e)
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    onCheckSpaces(e)
    setSeconds(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(label, minutes, seconds)
    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          name="todo"
          onChange={onLabelChange}
          value={label}
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
          onChange={onMinutesChange}
          value={minutes}
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
          onChange={onSecondsChange}
          value={seconds}
        />
        <button type="submit" className="hidden"></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}

export default NewTaskForm
