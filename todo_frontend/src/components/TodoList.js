import React from "react";
import { List, Paper } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = React.memo(({ items, onItemCheck, onItemRemove }) => (
  <>
    {items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "auto" }}>
          {items.map((todo, idx) => (
            <TodoListItem
              {...todo}
              key={`TodoItem.${idx}`}
              divider={idx !== items.length - 1}
              onButtonClick={() => onItemRemove(idx)}
              onCheckBoxToggle={() => onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;
