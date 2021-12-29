import { useState } from "react";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event) => setInputValue(event.target.value),
    clearInput: () => setInputValue(""),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }
      return false;
    }
  };
};

export const useTodos = (initialValue = []) => {
  var [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: (text, status) => {
      if (text !== "") {
        setTodos(
          todos.concat({
            text,
            checked: status
          })
        );
      }
    },
    checkTodo: (idx) => {
      setTodos(
        todos.map((todo, index) => {
          if (idx === index) {
            todo.checked = !todo.checked;
          }
          return todo;
        })
      );
    },
    removeTodo: (idx) => {
      setTodos(todos.filter((_, index) => idx !== index));
    },
    editTodo: (idx, text) => {
      if (text !== "") {
        setTodos(
          todos.concat({
            text,
            checked: false
          })
        );
      }
    },
    listTodos: (todolist) => {
      for (let i = 0; i < todolist.length; i++) {
        var todo = todolist[i]
        var text = todo.text;
        var finished = todo.finished;
        setTodos(
          todos.push({
            text,
            checked: finished
          }))
        console.log(todos)
      }
    }
  };
};
