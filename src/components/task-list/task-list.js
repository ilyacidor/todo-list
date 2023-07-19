import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

const TaskList = ({ todos = [], onDeleted, onEdited, onToggleChecked, updateTimer }) => {
  const elements = todos.map((item) => {
    const { ...itemProps } = item
    const { id } = itemProps

    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onEdited={onEdited}
        updateTimer={updateTimer}
        onToggleChecked={() => onToggleChecked(id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
}

export default TaskList
