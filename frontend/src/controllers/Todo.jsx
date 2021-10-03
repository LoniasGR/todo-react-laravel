import React from 'react';
import PropTypes from 'prop-types';
import TodoView from '../views/Todo';

function Todo(props) {
  const { todo, handleDelete, handleCompleted } = props;
  const {
    id, title, text, completed,
  } = todo;

  return (
    <TodoView
      title={title}
      text={text}
      completed={completed}
      handleDelete={() => { handleDelete(id); }}
      handleCompleted={() => { handleCompleted(id); }}
    />
  );
}

export default Todo;

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,

};
