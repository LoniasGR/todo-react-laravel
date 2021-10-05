import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { apiURL } from "../api";
import AddTodoView from "../views/AddTodo";

function AddTodo(props) {
  const { uuid, setAddedTodo, addToTodoList } = props;

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [writing, setWriting] = useState(false);

  const createTodo = () => {
    axios
      .post(`${apiURL}/todo/`, {
        title,
        text,
        session_uuid: uuid,
      })
      .then(() => {
        setAddedTodo(true);
      });
    setText("");
    setTitle("");
    setWriting(false);
    addToTodoList({
      id: -1,
      title,
      text,
      completed: false,
    });
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if (text !== "") {
          createTodo();
          setWriting(false);
        }
      } else if (event.code === "Escape") {
        event.preventDefault();
        setWriting(false);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <AddTodoView
      title={title}
      text={text}
      newTodo={writing}
      setText={setText}
      setTitle={setTitle}
      setNewTodo={setWriting}
    />
  );
}

export default AddTodo;

AddTodo.propTypes = {
  uuid: PropTypes.string.isRequired,
  setAddedTodo: PropTypes.func.isRequired,
  addToTodoList: PropTypes.func.isRequired,
};
