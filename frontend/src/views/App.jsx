import React from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AddTodo from "../controllers/AddTodo";
import Todo from "../controllers/Todo";

import "../css/App.css";

export default function App(props) {
  const {
    todoList,
    uuid,
    setAddedTodo,
    handleCompleted,
    handleDelete,
    handleEdited,
    addToTodoList,
  } = props;
  return (
    <div>
      <Typography variant="h1">My to-dos</Typography>
      <AddTodo
        setAddedTodo={setAddedTodo}
        uuid={uuid}
        addToTodoList={addToTodoList}
      />
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {todoList.map((todo) => (
          <Grid item key={todo.id} sm={4} md={4}>
            <Todo
              key={todo.id}
              todo={todo}
              handleCompleted={handleCompleted}
              handleDelete={handleDelete}
              handleEdited={handleEdited}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

App.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  uuid: PropTypes.string.isRequired,
  setAddedTodo: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,
  handleEdited: PropTypes.func.isRequired,
  addToTodoList: PropTypes.func.isRequired,
};
