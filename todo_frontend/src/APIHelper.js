import axios from "axios"

const API_URL = "http://localhost:3000/tasks/"

async function createinputTask(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    todo: task,
    finished: 'false'
  })
  return newTodo
}

async function deleteinputTask(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateinputState(id, toggle) {
  console.log(toggle)
  if (toggle) {
    console.log("entra true")
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, {finished: false})
    return newTodo
  } else {
    console.log("entra false")
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, {finished: true})
    console.log(newTodo)
    return newTodo
  }
}
async function updateinputTask(id, toggle) {
  console.log(toggle)
  if (toggle) {
    console.log("entra true")
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, {finished: false})
    return newTodo
  } else {
    console.log("entra false")
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, {finished: true})
    console.log(newTodo)
    return newTodo
  }
}

async function getTodoList() {
  const { data: todos } = await axios.get(API_URL)
  const todolist = todos
  return todolist
}

export default { createinputTask, deleteinputTask, updateinputTask, updateinputState, getTodoList }