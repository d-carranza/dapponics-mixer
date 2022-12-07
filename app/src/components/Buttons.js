import React from "react";

// TODO: Save Changes is a form that fetches the state to the backend
// TODO: Create Collection is ../../static/app/logic

function Buttons(props) {
  const { state, setState } = props;

  async function saveChanges() {
    // Filter user inputs before sending data to the database

    // Check null inputs
    let nullValues = false;
    for (let attribute of state["attributes"]) {
      if (attribute["trait_type"] == "") {
        nullValues = true;
      }
      for (let trait of attribute["traits"]) {
        if (trait["img"] == "" || trait["value"] == "" || trait["rarity"] == "")
          nullValues = true;
      }
    }
    if (nullValues == true) {
      alert("Some fields are empty");
    }

    // Check Rarity total
    let rarityIsValid = false;
    let total = 0;
    console.log(total);
    for (let attribute of state["attributes"]) {
      for (let trait of attribute["traits"]) {
        const rarity = parseInt(trait["rarity"]);
        if (typeof rarity == "number") {
          total += rarity;
          console.log(total);
        }
      }
    }
    if (total == 100) {
      rarityIsValid = true;
    }
    if (rarityIsValid == false) {
      alert("Same trait type rarities must add up 100");
    }

    // If fields are valid then fetch the state to the backend
    if (nullValues == false && rarityIsValid == true) {
      const request = {
        method: "POST",
        body: JSON.stringify({ ...state }),
      };

      // Fetch POST request
      const response = await fetch("/save", request);
      const result = await response.json();
      console.info(result);
    }
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
