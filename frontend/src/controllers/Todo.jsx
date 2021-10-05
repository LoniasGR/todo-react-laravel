import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoView from "../views/Todo";

function Todo(props) {
  const { todo, handleDelete, handleCompleted, handleEdited } = props;
  const { id, text, completed } = todo;
  const title = todo.title || "";
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [editing, setEditing] = useState(false);

  const listener = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      if (newText !== "") {
        handleEdited(id, newTitle, newText);
        setEditing(false);
      }
    } else if (event.code === "Escape") {
      event.preventDefault();
      setNewTitle(title || "");
      setNewText(text);
      setEditing(false);
    }
  };

  return (
    <TodoView
      title={title}
      text={text}
      editing={editing}
      newTitle={newTitle}
      newText={newText}
      setNewTitle={setNewTitle}
      setNewText={setNewText}
      setEditing={setEditing}
      completed={completed}
      handleDelete={() => {
        handleDelete(id);
      }}
      handleCompleted={() => {
        handleCompleted(id);
      }}
      listener={listener}
    />
  );
}

export default Todo;

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdited: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,
};
