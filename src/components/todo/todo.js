import React, { Component } from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './todo.css'

export default class Todo extends Component {
  state = {
    todoData: [],
    currentFilter: 'All',
  }

  createTodoaItem(value) {
    return {
      label: value,
      id: Math.ceil(Math.random() * 1000),
      checked: false,
      date: new Date(),
    }
  }

  addItem = (value) => {
    const newItem = this.createTodoaItem(value)
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  editItem = (id, value) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
        if (el.id === id) el.label = value
        return el
      }),
    }))
  }

  onToggleChecked = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, checked: !oldItem.checked }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  filterItems = () => {
    const { todoData, currentFilter } = this.state
    return todoData.filter(({ checked }) => {
      const all = currentFilter === 'All'
      const completed = currentFilter === 'Completed'
      return all ? true : completed ? checked === true : checked === false
    })
  }

  onChangeFilter = (text) => {
    this.setState({ currentFilter: text })
  }

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      let newArray = []
      newArray = todoData.filter((el) => !el.checked)

      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const notCheckedCount = this.state.todoData.length - this.state.todoData.filter((el) => el.checked).length

    return (
      <section className="todo-app">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={this.filterItems()}
            onDeleted={this.deleteItem}
            onEdited={this.editItem}
            onToggleChecked={this.onToggleChecked}
          />
          <Footer
            toDo={notCheckedCount}
            onChangeFilter={this.onChangeFilter}
            filter={this.state.currentFilter}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    )
  }
}
