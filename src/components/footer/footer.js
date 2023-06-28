import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

export default class Footer extends Component {
  static defaultProps = {
    toDo: 0,
  }

  static propTypes = {
    toDo: PropTypes.number,
    onClearCompleted: PropTypes.func.isRequired,
  }

  render() {
    const toDo = this.props.toDo
    const { onChangeFilter, filter, onClearCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count"> {toDo} items left</span>
        <TasksFilter onChangeFilter={onChangeFilter} filter={filter} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
