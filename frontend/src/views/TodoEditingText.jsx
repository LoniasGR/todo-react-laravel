import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

function TodoEditingText(props) {
  const { newTitle, newText, setNewTitle, setNewText, listener } = props;

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return function cleanup() {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div>
      <form>
        <TextField
          fullWidth
          name="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <TextField
          fullWidth
          name="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      </form>
    </div>
  );
}

export default TodoEditingText;

TodoEditingText.propTypes = {
  newTitle: PropTypes.string.isRequired,
  newText: PropTypes.string.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  setNewText: PropTypes.func.isRequired,
  listener: PropTypes.func.isRequired,
};
