import React from "react";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

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

function TodoNormalText(props) {
  const { title, text, completed, handleCompleted } = props;
  const strikeThrough = completed === "1" ? "line-through" : "none";

  return (
    <div style={{ display: "flex" }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {title !== "" && (
          <ToDoButton
            variant="text"
            onClick={handleCompleted}
            style={{ textDecoration: strikeThrough, fontSize: "25px" }}
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
      </Stack>
    </div>
  );
}

export default TodoNormalText;

TodoNormalText.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
  handleCompleted: PropTypes.func.isRequired,
};

TodoNormalText.defaultProps = {
  title: "",
};
