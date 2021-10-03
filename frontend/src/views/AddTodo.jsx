import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Box';

function AddTodo(props) {
  const {
    title, text, newTodo, setText, setTitle, setNewTodo,
  } = props;
  return (
    <Paper sx={{
      width: 500,
      maxWidth: '100%',
      alignItems: 'center',
      margin: 'auto',
      marginBottom: '5em',
      marginTop: '3em',
    }}
    >
      <form>
        {newTodo
            && (
            <TextField
              fullWidth
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            )}
        <TextField
          fullWidth
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => { setNewTodo(true); }}
          placeholder={newTodo ? 'Text' : 'Add a new to-do'}
        />
      </form>
    </Paper>
  );
}

export default AddTodo;

AddTodo.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  newTodo: PropTypes.bool.isRequired,
  setText: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setNewTodo: PropTypes.func.isRequired,
};
