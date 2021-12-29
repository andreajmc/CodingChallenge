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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [todolist, setTodoList] = useState({});
  const [open, setOpen] = useState(false);
  const[ogText, setOgText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setOgText("placeholder");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchinputTaskAndSettodolist = async () => {
      const newtodolist = await APIHelper.getTodoList()
      setTodoList(newtodolist)
      /*  const newlist = []
        for (var i = 0; i < newtodolist.length; i++) {
          newlist.push({ text: newtodolist[i].todo, checked: newtodolist[i].finished })
        };
        setList(newlist)*/
      for (var i; i < todolist.length; i++) {
        addTodo(todolist[i].todo, todolist[i].finished)
      }
    }
    fetchinputTaskAndSettodolist()

  })

  /* const loadList = async () => {
     var list = []
     const newtodolist = await APIHelper.getTodoList()
     setTodoList(newtodolist)
     console.log(newtodolist)
     for (var i = 0; i < newtodolist.length; i++) {
       addTodo({text: newtodolist[i].todo, finished: newtodolist[i].finished })
     };
     /*todolist.forEach(todo => {
       list.push({text: todo.todo, finished: todo.finished})
     });
     console.log(list)
     return list
   }*/

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
    const payload = {
      completed: !todolist.find(inputTask => inputTask._id === id).completed,
    }
    const modTask = await APIHelper.updateinputTask(id, payload)
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

  const editTodos = (idx, text) => {
    editTodo(idx, text)
    updateinputTask(idx, text)
    handleClose();
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
          onItemUpdate={handleClickOpen}
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
            margin="dense"
            id="name"
            label={ogText}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editTodos}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default App