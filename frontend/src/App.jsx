import React, { useState, useEffect } from "react";
import { v4 as uuidv4, validate as isValidUUID } from "uuid";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./api";
import AppView from "./views/App";

function App() {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [todoList, setTodoList] = useState([]);
  const [addedTodo, setAddedTodo] = useState(false);
  const [paint, setPaint] = useState(false);
  let uuid = query.get("id");

  const addToTodoList = (todo) => {
    setTodoList((prevList) => [...prevList, todo]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (uuid === "" || uuid === null || uuid === undefined) {
        uuid = uuidv4();
        axios.post(`${apiURL}/session/${uuid}`).then((response) => {
          if (response.data.success === true) {
            history.push({
              pathname: window.location.pathname,
              search: `?id=${uuid}`,
            });
            setPaint(true);
          } else {
            console.error(response);
          }
        });
      } else if (!isValidUUID(uuid)) {
        history.push("uuid-error");
      } else {
        axios.get(`${apiURL}/session/${uuid}`).then((response) => {
          if (response.data.success === true) {
            const { todos } = response.data;
            setTodoList([]);
            todos.map((todo) => addToTodoList(todo));
            setPaint(true);
            setAddedTodo(false);
          }
        });
      }
    };

    fetchData();
  }, [addedTodo]);

  const handleCompleted = (id) => {
    const temp = [...todoList];
    const idx = temp.findIndex((elem) => elem.id === id);
    const todo = temp[idx];
    axios
      .put(`${apiURL}/todo/${id}`, {
        session_uuid: uuid,
        title: todo.title,
        text: todo.text,
        completed: todo.completed === "0" ? "1" : "0",
      })
      .then(() => {
        setAddedTodo(true);
      });
    todo.completed = todo.completed === "0" ? "1" : "0";
    temp.splice(idx, 1, todo);
    setTodoList(temp);
  };

  const handleDelete = (id) => {
    const temp = [...todoList];
    const idx = temp.findIndex((elem) => elem.id === id);
    axios
      .delete(`${apiURL}/todo/${id}`, {
        data: {
          session_uuid: uuid,
        },
      })
      .then(() => {
        setAddedTodo(true);
      });
    temp.splice(idx, 1);
    setTodoList(temp);
  };

  const handleEdited = (id, title, text) => {
    const temp = [...todoList];
    const idx = temp.findIndex((elem) => elem.id === id);
    const todo = temp[idx];
    axios
      .put(`${apiURL}/todo/${id}`, {
        session_uuid: uuid,
        title,
        text,
        completed: todo.completed,
      })
      .then(() => {
        setAddedTodo(true);
      });
    todo.title = title;
    todo.text = text;
    temp.splice(idx, 1, todo);
    setTodoList(temp);
  };
  return (
    <div className="App">
      {paint && (
        <AppView
          todoList={todoList}
          uuid={uuid}
          setAddedTodo={setAddedTodo}
          handleCompleted={handleCompleted}
          handleDelete={handleDelete}
          handleEdited={handleEdited}
          addToTodoList={addToTodoList}
        />
      )}
    </div>
  );
}

export default App;
