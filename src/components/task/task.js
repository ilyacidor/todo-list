import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'

import './task.css'

export default class Task extends Component {
  static defaultProps = {
    date: new Date(),
    onEdited: () => {},
  }

  static propTypes = {
    label: PropTypes.node,
    id: PropTypes.number,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    onEdited: PropTypes.func,
    onDeleted: PropTypes.func.isRequired,
    onToggleChecked: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
    value: '',
  }

  onToggleEdited = () => {
    this.setState(({ editing }) => ({
      editing: !editing,
      value: this.props.label,
    }))
  }

  onLabelChange = (e) => {
    if (e.target.value.charAt(0) === ' ') {
      e.target.value = ''
    }
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onEdited, id } = this.props
    onEdited(id, this.state.value)
    this.setState({ value: '' })
    this.setState({ editing: false })
  }

  render() {
    const { onDeleted, id, checked, onToggleChecked, label, date } = this.props

    return (
      <li className={checked ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} checked={checked} onChange={onToggleChecked} />
          <label htmlFor={id}>
            <span className="description"> {label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: KG,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.onToggleEdited}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.state.editing && (
          <form onSubmit={this.onSubmit}>
            <input
              onChange={this.onLabelChange}
              type="text"
              className="edit"
              required
              name="edit-item"
              value={this.state.value}
            />
          </form>
        )}
      </li>
    )
  }
}
