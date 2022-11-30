import React from "react";

// TODO: Save Changes is a form that fetches the state to the backend
// TODO: Create Collection is ../../static/app/logic

function Buttons(props) {
  const state = props.state;
  const setState = props.setState;

  async function saveChanges() {
    const request = {
      method: "POST",
      body: JSON.stringify({ ...state }),
    };

    // Fetch POST request
    const response = await fetch("/save", request);
    const result = await response.json();
    console.info(result);
  }

  return (
    <div className="buttons">
      <button className="app-btn" onClick={saveChanges}>
        Save Changes
      </button>
      <button className="app-btn">Create Collection</button>
    </div>
  );
}

export default Buttons;
