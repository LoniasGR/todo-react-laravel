import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const lightTheme = createTheme({ palette: { mode: 'light' } });

const Item = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.secondary,
  height: 120,
  minWidth: '13em',
  width: 500,
}));

const ToDoButton = styled(ButtonUnstyled)(`
background-color: #fff;
color: #000;
font-family: Roboto;
font-size: 16px;
transition: all 200ms ease;
cursor: pointer;
border: none;
width: 100%;
height: 100%;
display: block;


&:hover {
  background-color: #fff;
}
`);

function Todo(props) {
  const {
    title, text, completed, handleDelete, handleCompleted,
  } = props;

  const strikeThrough = completed ? 'line-through' : 'none';
  return (
    <ThemeProvider theme={lightTheme}>
      <Item>
        <Grid container direction="row">
          <Grid item xs={8} md={8}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            />
            {title !== ''
              && (
              <ToDoButton
                variant="text"
                onClick={handleCompleted}
                style={{ textDecoration: strikeThrough, fontSize: '25px' }}
              >
                {title}
              </ToDoButton>
              )}
            <ToDoButton
              onClick={handleCompleted}
              style={{ textDecoration: strikeThrough }}
            >
              {text}
            </ToDoButton>
          </Grid>
          <Grid
            item
            xs={4}
            md={4}
            sx={{ alignItems: 'right', justifyItems: 'right', marginTop: '1rem' }}
          >
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
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,
};
