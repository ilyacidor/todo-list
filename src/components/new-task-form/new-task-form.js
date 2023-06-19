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
  }

  onLabelChange = (e) => {
    if (e.target.value.charAt(0) === ' ') {
      e.target.value = ''
    }
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          name="todo"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    )
  }
}
