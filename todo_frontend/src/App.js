import React, { useState, useEffect } from "react"
import APIHelper from "./APIHelper.js"
import { useInputValue, useTodos } from "./custom-hooks";
import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [todolist, setTodoList] = useState({});
  const [open, setOpen] = useState(false);
  const [editID, seteditID] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    editTodo(editID, inputValue)
    updateinputTask(editID, inputValue)
    setOpen(false);
  };

  useEffect(() => {
    const fetchinputTaskAndSettodolist = async () => {
      const newtodolist = await APIHelper.getTodoList()
      setTodoList(newtodolist)
      for (var i; i < todolist.length; i++) {
        addTodo(todolist[i].todo, todolist[i].finished)
      }
    }
    fetchinputTaskAndSettodolist()

  })

  const createinputTask = async (inputTask) => {
    if (!inputTask) {
      console.log("its empty")
      alert("Please write down a task to add.")
      return
    }
    if (todolist.some(t => t.todo === inputTask)) {
      alert(`This task already exists!`)
      return
    } else {
      const newinputTask = await APIHelper.createinputTask(inputTask)
      setTodoList(newinputTask)
      addTodo(inputValue, false);
      return
    }
  }

  const deleteinputTask = async (idx) => {
    try {
      const id = todolist[idx]._id;
      console.log(id)
      await APIHelper.deleteinputTask(id)
      setTodoList(todolist.filter(({ _id: i }) => id !== i))
    } catch (err) { }
  }

  const updateinputTask = async (id) => {
    const modTask = await APIHelper.updateinputTask(id)
    setTodoList(todolist.map(inputTask => (inputTask._id === id ? modTask : inputTask)))
  }

  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { addTodo, checkTodo, removeTodo, editTodo } = useTodos();

  const clearInputAndAddTodo = () => {
    clearInput();
    createinputTask(inputValue);
  };

  const removeTodos = (idx) => {
    removeTodo(idx);
    deleteinputTask(idx);
  }

  const editTodos = (idx) => {
    console.log(idx)
    seteditID(idx)
    handleClickOpen()
    console.log("index",editID)
  }

  const clearAll = () => {
    for (var i = 0; i < todolist.length; i++) {
      removeTodos(i);
    }
  }

  const clearSel = () => {
    for (var i = 0; i < todolist.length; i++) {
      if (todolist[i].finished)
        removeTodos(i);
    }
  }

  return (
    <>
      <Layout>
        <AddTodo
          inputValue={inputValue}
          onInputChange={changeInput}
          onButtonClick={clearInputAndAddTodo}
          onInputKeyPress={(event) => keyInput(event, clearInputAndAddTodo)}
        />
        <TodoList
          items={todolist}
          onItemCheck={checkTodo}
          onItemRemove={removeTodos}
          onItemUpdate={editTodos}
        />
        <ButtonGroup variant="text" color="warning" aria-label="text button group" style={{ marginLeft: "80%", marginBottom: "1%" }}>
          <Button onClick={clearSel}>Clear Selected</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </ButtonGroup>
      </Layout>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputValue={inputValue}
            margin="dense"
            id="upTask"
            label="Update task"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default App