import React from "react";

// import icon
import DeleteIcon from "@material-ui/icons/Delete";

// import component
import Checkbox from "@material-ui/core/Checkbox";

export const List = (props) => {
  return (
    <li className="list">
      <Checkbox
        checked={props.tar}
        onChange={(e) => props.checkedCompleted(e, props.list, props.id)}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <button
        className="pDeletebtn"
        onClick={() => {
          props.onSelect(props.id);
        }}
      >
        <DeleteIcon className="deleteBtn" />
      </button>
      {props.list}
    </li>
  );
};
