import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

const Footer = ({ toDo = 0, onChangeFilter, filter, onClearCompleted }) => {
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

Footer.propTypes = {
  toDo: PropTypes.number,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
