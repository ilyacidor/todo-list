import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'All',
    onChangeFilter: () => {},
  }

  static propTypes = {
    filter: PropTypes.string,
    onChangeFilter: PropTypes.func,
  }

  render() {
    const { filter, onChangeFilter } = this.props
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
}
