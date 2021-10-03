import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AddTodoView from '../views/AddTodo';

function AddTodo(props) {
  const { addToTodoList } = props;
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [newTodo, setNewTodo] = useState(false);
  const [counter, setCounter] = useState(0);

  const createTodo = () => {
    addToTodoList({
      id: counter, title, text, completed: false,
    });
    setText('');
    setTitle('');
    setNewTodo(false);
    setCounter(counter + 1);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        if (text !== '') { createTodo(); setNewTodo(false); }
      } else if (event.code === 'Escape') {
        event.preventDefault();
        setNewTodo(false);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  return (
    <AddTodoView
      title={title}
      text={text}
      newTodo={newTodo}
      setText={setText}
      setTitle={setTitle}
      setNewTodo={setNewTodo}
    />
  );
}

export default AddTodo;

AddTodo.propTypes = {
  addToTodoList: PropTypes.func.isRequired,
};
