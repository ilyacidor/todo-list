import React, { useState } from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './todo.css'

const createTodoItem = () => {
  let maxId = 0
  function increaseMaxId() {
    maxId++
  }
  function createNewItem(value, minutes, seconds) {
    return {
      label: value,
      id: maxId,
      checked: false,
      date: new Date(),
      minutes: minutes,
      seconds: seconds,
    }
  }
  return [increaseMaxId, createNewItem]
}

const [increaseMaxId, createNewItem] = createTodoItem()

const Todo = () => {
  const [todoData, setTodoData] = useState([])
  const [currentFilter, setCurrentFilter] = useState('All')

  const correctTime = (time) => {
    time = time.length > 2 ? time.slice(-2) : time
    return (time = time.length < 2 ? '0' + time : time)
  }

  const addItem = (value, minutesValue, secondsValue) => {
    minutesValue = correctTime(minutesValue)
    secondsValue = correctTime(secondsValue)
    increaseMaxId()
    const newItem = createNewItem(value, minutesValue, secondsValue)
    setTodoData(() => {
      const newArray = [...todoData, newItem]
      return newArray
    })
  }

  const updateTimer = (id, minutes, seconds) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((task) => task.id === id)
      if (idx >= 0) {
        let updatedTask = {
          ...todoData[idx],
          minutes: correctTime(String(minutes)),
          seconds: correctTime(String(seconds)),
        }
        return [...todoData.slice(0, idx), updatedTask, ...todoData.slice(idx + 1)]
      }
      return [...todoData]
    })
  }

  const deleteItem = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return newArray
    })
  }

  const editItem = (id, value) => {
    setTodoData(
      todoData.map((el) => {
        if (el.id === id) el.label = value
        return el
      })
    )
  }

  const onToggleChecked = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, checked: !oldItem.checked }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return newArray
    })
  }

  const filterItems = () => {
    return todoData.filter(({ checked }) => {
      const all = currentFilter === 'All'
      const completed = currentFilter === 'Completed'
      return all ? true : completed ? checked === true : checked === false
    })
  }

  const onChangeFilter = (text) => {
    setCurrentFilter(text)
  }

  const onClearCompleted = () => {
    setTodoData(() => {
      let newArray = []
      newArray = todoData.filter((el) => !el.checked)
      return newArray
    })
  }

  const notCheckedCount = todoData.length - todoData.filter((el) => el.checked).length

  return (
    <section className="todo-app">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={filterItems()}
          onDeleted={deleteItem}
          onEdited={editItem}
          onToggleChecked={onToggleChecked}
          updateTimer={updateTimer}
        />
        <Footer
          toDo={notCheckedCount}
          onChangeFilter={onChangeFilter}
          filter={currentFilter}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  )
}

export default Todo
