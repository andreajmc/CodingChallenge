import React from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditIcon from '@mui/icons-material/Edit';


const TodoListItem = React.memo(
  ({ text, divider, checked, onCheckBoxToggle, onDeleteClick, onUpdateClick }) => (
    <ListItem divider={divider}>
      <Checkbox onClick={onCheckBoxToggle} checked={checked} disableRipple />
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Modify Todo" onClick={onUpdateClick}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete Todo" onClick={onDeleteClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
);

export default TodoListItem;
