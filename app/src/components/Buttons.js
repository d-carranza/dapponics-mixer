import React from "react";

// TODO: Create Collection is ../../static/app/logic

function Buttons(props) {
  const { state, setState } = props;

  async function saveChanges() {
    // Input filter: inputs are not empty
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

    // Input filter: rarity total is valid
    let rarityIsValid = false;
    let total = 0;
    for (let attribute of state["attributes"]) {
      total = 0;
      for (let trait of attribute["traits"]) {
        const rarity = parseInt(trait["rarity"]);
        if (typeof rarity == "number" && rarity >= 0) {
          total += rarity;
        }
      }
    }
    if (total == 100) {
      rarityIsValid = true;
    }
    if (rarityIsValid == false) {
      alert("Same trait type rarities must add up 100");
    }

    // Fetch user inputs to the backend
    if (nullValues == false && rarityIsValid == true) {
      const request = {
        method: "POST",
        body: JSON.stringify({ ...state }),
      };
      const response = await fetch("/save", request);
      const result = await response.json();
      console.info(result);
    }
  }

  function createCollection() {
    const supply = state.supply;
    const attributes = state.attributes;

    console.log(`The supply is ${supply}`);
    console.log(attributes);

    // for each type select randomply one trait and overlay the pngs
  }

  return (
    <div className="buttons">
      <button className="app-btn" onClick={saveChanges}>
        Save Changes
      </button>
      <button className="app-btn" onClick={createCollection}>
        Create Collection
      </button>
    </div>
  );
}

export default Buttons;
