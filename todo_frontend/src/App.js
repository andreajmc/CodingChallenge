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
  const [modidx, setModidx] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleModClose = () => {
    clearModInput()
    editTodo(modidx, inputModValue)
    updateinputTask(modidx, inputModValue)
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false)
  }

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
      await APIHelper.deleteinputTask(id)
      setTodoList(todolist.filter(({ _id: i }) => id !== i))
    } catch (err) { }
  }

  const updateinputTask = async (idx, newTodo) => {
    try {
      const id = todolist[idx]._id;
      const modTask = await APIHelper.updateinputTask(id, newTodo)
      console.log("modtask", modTask)
      setTodoList(todolist.map(inputTask => (inputTask._id === id ? modTask : inputTask)))    
    } catch (err) {
    }
  }

  const updateinputState = async (idx) => {
    const id = todolist[idx]._id;
      console.log("idx", idx, "id", id, "check:", todolist[idx].finished)
      await APIHelper.updateinputState(id, todolist[idx].finished)
      // setTodoList(todolist.map(inputTask => (inputTask._id === id ? modTask : inputTask)))    
      checkTodo(idx) 
  }

  const { inputValue, inputModValue, changeInput, clearInput, keyInput, changeModInput, clearModInput } = useInputValue();
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
    setModidx(idx)
    handleClickOpen()
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
          onItemCheck={updateinputState}
          onItemRemove={removeTodos}
          onItemUpdate={editTodos}
        />
        <ButtonGroup variant="text" color="warning" aria-label="text button group" style={{ marginLeft: "80%", marginBottom: "1%" }}>
          <Button onClick={clearSel}>Clear Selected</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </ButtonGroup>
      </Layout>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="upTask"
            label="Write your updated task here."
            value={inputModValue}
            type="text"
            fullWidth
            variant="standard"
            onChange={changeModInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleModClose}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default App