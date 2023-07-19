import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

const TasksFilter = ({ filter = 'All', onChangeFilter = () => {} }) => {
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'All' ? 'selected' : null} onClick={() => onChangeFilter('All')}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'Active' ? 'selected' : null} onClick={() => onChangeFilter('Active')}>
          Active
        </button>
      </li>
      <li>
        <button className={filter === 'Completed' ? 'selected' : null} onClick={() => onChangeFilter('Completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
}

export default TasksFilter
