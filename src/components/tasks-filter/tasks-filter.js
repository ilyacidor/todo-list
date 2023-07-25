import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

const TasksFilter = ({ filter = 'All', onChangeFilter = () => {} }) => {
  return (
    <ul className="filters">
      <li>
        <label className={filter === 'All' ? 'selected' : null}>
          <input type="radio" name="radio" className="radio" defaultChecked onChange={() => onChangeFilter('All')} />
          All
        </label>
      </li>
      <li>
        <label className={filter === 'Active' ? 'selected' : null}>
          <input type="radio" name="radio" className="radio" onChange={() => onChangeFilter('Active')} />
          Active
        </label>
      </li>
      <li>
        <label className={filter === 'Completed' ? 'selected' : null}>
          <input type="radio" name="radio" className="radio" onChange={() => onChangeFilter('Completed')} />
          Completed
        </label>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
}

export default TasksFilter
