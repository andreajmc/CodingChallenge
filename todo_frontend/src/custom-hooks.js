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
      console.log(text)
        if (text !== "") {
          todos[idx] = {text, checked: false}
        }
    },
  };
};
