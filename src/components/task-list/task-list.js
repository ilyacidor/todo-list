import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
  }

  render() {
    const todos = this.props.todos
    const elements = todos.map((item) => {
      const { ...itemProps } = item
      const { id } = itemProps
      const { onDeleted, onEdited, onToggleChecked, onStartTimer, onStopTimer } = this.props

      return (
        <Task
          key={id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onEdited={onEdited}
          onToggleChecked={() => onToggleChecked(id)}
          onStartTimer={() => onStartTimer(id)}
          onStopTimer={() => onStopTimer(id)}
        />
      )
    })

    return (
      <ul className="todo-list" key={this.props.id}>
        {elements}
      </ul>
    )
  }
}
