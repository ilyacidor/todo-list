import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'

import './task.css'

const Task = ({
  onDeleted,
  onEdited = () => {},
  updateTimer,
  id,
  checked,
  onToggleChecked,
  label,
  date = new Date(),
  minutes,
  seconds,
}) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const [newMinutes, setNewMinutes] = useState(Number(minutes))
  const [newSeconds, setNewSeconds] = useState(Number(seconds))
  const [timerIsRun, setTimerIsRun] = useState(false)

  useEffect(() => {
    const Interval = setTimeout(() => {
      if (timerIsRun) {
        if (newMinutes > 0 && newSeconds == 0) {
          setNewMinutes(newMinutes - 1)
          setNewSeconds(59)
        } else {
          if (newSeconds > 0) setNewSeconds(newSeconds - 1)
        }
      }
    }, 1000)
    if (Number(newMinutes) == 0 && Number(newSeconds) == 0) setTimerIsRun(false)
    updateTimer(id, newMinutes, newSeconds)
    return () => {
      clearInterval(Interval)
    }
  }, [newMinutes, newSeconds, timerIsRun])

  const onStartTimer = () => {
    setTimerIsRun(true)
  }

  const onStopTimer = () => {
    setTimerIsRun(false)
  }

  const onToggleEdited = () => {
    setEditing(!editing)
    setValue(label)
  }

  const onLabelChange = (e) => {
    if (e.target.value.charAt(0) === ' ') {
      e.target.value = ''
    }
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onEdited(id, value)
    setValue('')
    setEditing(false)
  }

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input className="toggle" type="checkbox" id={id} checked={checked} onChange={onToggleChecked} />
        <label htmlFor={id}>
          <span className="title"> {label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onStartTimer}></button>
            <button className="icon icon-pause" onClick={onStopTimer}></button>
            {minutes}:{seconds}
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEdited}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editing && (
        <form onSubmit={onSubmit}>
          <input onChange={onLabelChange} type="text" className="edit" required name="edit-item" value={value} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  label: PropTypes.node,
  time: PropTypes.node,
  id: PropTypes.number,
  checked: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  onEdited: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
  onDeleted: PropTypes.func.isRequired,
  onToggleChecked: PropTypes.func.isRequired,
}

export default Task
