import React, { Component } from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './todo.css'

export default class Todo extends Component {
  maxId = 1

  state = {
    todoData: [],
    currentFilter: 'All',
  }

  createTodoItem(value, timeValue) {
    return {
      label: value,
      id: this.maxId++,
      checked: false,
      date: new Date(),
      time: timeValue,
      timerIsRun: false,
      startCalls: 0,
    }
  }

  correctTime = (time) => {
    time = time.length > 2 ? time.slice(-2) : time
    return (time = time.length < 2 ? '0' + time : time)
  }

  addItem = (value, minutesValue, secondsValue) => {
    minutesValue = this.correctTime(minutesValue)
    secondsValue = this.correctTime(secondsValue)
    const newItem = this.createTodoItem(value, `${minutesValue}:${secondsValue}`)
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

  changeTimerState = (id, state) => {
    this.setState(
      ({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        let newStartCalls = oldItem.startCalls
        newStartCalls = state ? ++newStartCalls : 0
        const newItem = { ...oldItem, timerIsRun: state, startCalls: newStartCalls }
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        return {
          todoData: newArray,
        }
      },
      () => {}
    )
  }

  componentWillUnmount = () => {
    clearInterval(this.indicatorId)
  }

  startTimer = (id) => {
    this.changeTimerState(id, true)
    const itemId = this.state.todoData.findIndex((el) => el.id === id)
    const item = this.state.todoData[itemId]
    if (item.startCalls === 0) {
      this.indicatorId = setInterval(() => {
        this.setState(({ todoData }) => {
          const idx = todoData.findIndex((el) => el.id === id)
          const oldItem = todoData[idx]
          if (oldItem === undefined) return this.componentWillUnmount
          if (!oldItem.timerIsRun) return clearInterval(this.indicatorId)
          let minutes = Number(oldItem.time.slice(0, 2))
          let seconds = Number(oldItem.time.slice(3, 5))
          if (minutes === 0 && seconds === 0) return this.componentWillUnmount
          if (seconds > 0) {
            seconds--
          } else {
            minutes--
            seconds = 59
          }
          minutes = this.correctTime(String(minutes))
          seconds = this.correctTime(String(seconds))
          const newTime = `${minutes}:${seconds}`
          const newItem = { ...oldItem, time: newTime }
          const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
          return {
            todoData: newArray,
          }
        })
      }, 1000)
    }
  }

  stopTimer = (id) => {
    this.changeTimerState(id, false)
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
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
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
