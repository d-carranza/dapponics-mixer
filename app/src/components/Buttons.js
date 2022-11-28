import React from "react";

// TODO: Save Changes is a form that fetches the state to the backend
// TODO: Create Collection is ../../static/app/logic

function Buttons(props) {
  const state = props.state;
  const setState = props.setState;

  return (
    <div className="buttons">
      <button className="app-btn">Save Changes</button>
      <button className="app-btn">Create Collection</button>
    </div>
  );
}

export default Buttons;
