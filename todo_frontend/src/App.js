import React, { useState, useEffect } from "react"
import APIHelper from "./APIHelper.js"
import { useInputValue, useTodos } from "./custom-hooks";
import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Button, ButtonGroup } from "@material-ui/core";

function App() {
  const [todolist, settodolist] = useState([])
  //const [inputTask, setinputTask] = useState("")

  useEffect(() => {
    const fetchinputTaskAndSettodolist = async () => {
      const todolist = await APIHelper.getTodoList()
      settodolist(todolist)
    }
    fetchinputTaskAndSettodolist()
  }, [])

  const createinputTask = async (inputTask) => {
    if (!inputTask) {
      console.log("its empty")
      alert("Please write down a task to add.")
      return
    }

    if (todolist.some(t => t.todo === inputTask)) {
      alert(`This task already exists!`)
      return
    }
    console.log(todolist)
    const newinputTask = await APIHelper.createinputTask(inputTask)
    settodolist([...todolist, newinputTask])
  }

  const deleteinputTask = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteinputTask(id)
      settodolist(todolist.filter(({ _id: i }) => id !== i))
    } catch (err) { }
  }

  const updateinputTask = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todolist.find(inputTask => inputTask._id === id).completed,
    }
    const updatedinputTask = await APIHelper.updateinputTask(id, payload)
    settodolist(todolist.map(inputTask => (inputTask._id === id ? updatedinputTask : inputTask)))
  }

  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo, editTodo } = useTodos();

  const clearInputAndAddTodo = () => {
    clearInput();
    addTodo(inputValue);
    createinputTask(inputValue);
  };

  return (
    <Layout>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={(event) => keyInput(event, clearInputAndAddTodo)}
      />
      <TodoList
        items={todos}
        onItemCheck={checkTodo}
        onItemRemove={removeTodo}
        onItemEdit={editTodo}
      />
      <ButtonGroup variant="text" color="warning" aria-label="text button group" style={{ marginLeft: "80%", marginBottom: "1%" }}>
        <Button>Clear Selected</Button>
        <Button>Clear All</Button>
      </ButtonGroup>
    </Layout>
  );
};


export default App