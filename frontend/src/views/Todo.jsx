import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import TodoNormalText from "./TodoNormalText";
import TodoEditingText from "./TodoEditingText";

const lightTheme = createTheme({ palette: { mode: "light" } });

const Item = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.secondary,
  height: 120,
  minWidth: "13em",
  width: 500,
  display: "flex",
}));

function Todo(props) {
  const {
    title,
    text,
    editing,
    newTitle,
    newText,
    setNewTitle,
    setNewText,
    setEditing,
    completed,
    handleDelete,
    handleCompleted,
    listener,
  } = props;

  return (
    <ThemeProvider theme={lightTheme}>
      <Item>
        <Grid container direction="row">
          <Grid
            item
            xs={8}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {editing ? (
              <TodoEditingText
                newTitle={newTitle}
                newText={newText}
                setNewTitle={setNewTitle}
                setNewText={setNewText}
                listener={listener}
              />
            ) : (
              <TodoNormalText
                title={title}
                text={text}
                completed={completed}
                handleCompleted={handleCompleted}
              />
            )}
          </Grid>
          <Grid item xs={4} md={4} sx={{ display: "flex" }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                setEditing(true);
              }}
              aria-label="delete"
              style={{ marginRight: "1rem" }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDelete}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Item>
    </ThemeProvider>
  );
}

export default Todo;

Todo.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  newTitle: PropTypes.string.isRequired,
  newText: PropTypes.string.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  setNewText: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  completed: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  listener: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  title: "",
};
