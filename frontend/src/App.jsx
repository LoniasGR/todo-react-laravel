import React, { useState, useEffect } from 'react';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { useLocation, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AddTodo from './controllers/AddTodo';
import Todo from './controllers/Todo';

import './css/App.css';

function App() {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    let uuid = query.get('id');
    if (uuid === '' || uuid === null || uuid === undefined) {
      uuid = uuidv4();
      history.push({
        pathname: window.location.pathname,
        search: `?id=${uuid}`,
      });
    } else if (!isValidUUID(uuid)) {
      history.push('uuid-error');
    } else {
      // TODO with backend

    }
  });

  const handleCompleted = (id) => {
    const temp = [...todoList];
    const idx = temp.findIndex((elem) => elem.id === id);
    const todo = temp[idx];
    todo.completed = !todo.completed;
    temp.splice(idx, 1, todo);
    setTodoList(temp);
  };

  const handleDelete = (id) => {
    const temp = [...todoList];
    const idx = temp.findIndex((elem) => elem.id === id);
    temp.splice(idx, 1);
    setTodoList(temp);
  };

  const addToTodoList = (todo) => {
    setTodoList([...todoList, todo]);
  };

  return (
    <div className="App">
      <Typography variant="h1">My to-dos</Typography>
      <AddTodo addToTodoList={addToTodoList} />
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {
          todoList.map((todo) => (
            <Grid
              item
              key={todo.id}
              sm={4}
              md={4}
            >
              <Todo
                key={todo.id}
                todo={todo}
                handleCompleted={handleCompleted}
                handleDelete={handleDelete}
              />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default App;
