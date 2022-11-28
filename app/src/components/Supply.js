import React from "react";

function Supply(state) {
  function updateSupply(event) {
    state.setState({
      ...state.state,
      supply: event.target.value,
    });
  }

  return (
    <div id="input-supply">
      Choose your collection's supply:
      <div>
        <input
          className="textinput"
          value={state.state.supply}
          onChange={updateSupply}
          placeholder="Enter Supply"
        />
      </div>
    </div>
  );
}

export default Supply;
