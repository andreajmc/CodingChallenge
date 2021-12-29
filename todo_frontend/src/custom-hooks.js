import { useState } from "react";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [inputModValue, setInputModValue] = useState(initialValue);

  return {
    inputValue, inputModValue,
    changeInput: (event) => setInputValue(event.target.value),
    clearInput: () => setInputValue(""),
    changeModInput: (event) => setInputModValue(event.target.value),
    clearModInput: () => setInputModValue(""),
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
    editTodo: (idx, text, status) => {
        if (text !== "") {
          var item = {text, checked: status}
          setTodos(todos.splice(idx, 0, item))
          setTodos(todos.filter((_, index) => idx !== index));
        }
    },
  };
};
