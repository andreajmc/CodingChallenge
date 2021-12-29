import React from "react";
import { List, Paper } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = React.memo(({ items, onItemCheck, onItemRemove, onItemUpdate }) => (
  <>
    {items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "auto" }}>
          {items.map((todo, idx) => (
            <TodoListItem
              {...todo}
              text = {todo.todo}
              key={`TodoItem.${idx}`}
              divider={idx !== items.length - 1}
              onDeleteClick={() => onItemRemove(idx)}
              onUpdateClick={() => onItemUpdate(idx)}
              onCheckBoxToggle={() => onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;
