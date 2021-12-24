import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const AddTodo = React.memo(
  ({ inputValue, onInputChange, onInputKeyPress, onButtonClick }) => (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="What are you up to today?"
            variant="standard"
            value={inputValue}
            onChange={onInputChange}
            onKeyPress={onInputKeyPress}
            color="warning"
            focused
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="warning"
            variant="outlined"
            onClick={onButtonClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
);

export default AddTodo;
