import React from "react";

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
    console.log("Inputed state:", state);

    // Declare variables
    const supply = state.supply;
    const attributes = state.attributes;

    // Filter valid input
    if (supply == "" || supply <= 0) return console.info("Enter valid supply");

    // 1. Create the whole colection's metadata
    const metadata = [];

    // For each element in the suply
    for (let n = 0; n < supply; n++) {
      const token = {};
      const tokenAttributes = {};

      // Get one trait for each type
      for (const type of attributes) {
        // Set the rarities and values for this trait_type
        const rarities = [];
        const values = [];
        for (const trait of type.traits) {
          rarities.push(trait.rarity);
          values.push(trait.value);
        }

        // Return a value randomly
        function randvalue() {
          const ar = [];
          let i,
            sum = 0;
          for (i = 0; i < rarities.length - 1; i++) {
            sum += rarities[i] / 100.0;
            ar[i] = sum;
          }
          const r = Math.random();
          for (i = 0; i < ar.length && r >= ar[i]; i++);

          console.log(rarities, values, r, values[i]); // Print for debugging

          return values[i];
        }

        // Add value to type in the new token
        tokenAttributes[type.trait_type] = randvalue();
      }

      // Define token number and attributes
      token["token_id"] = parseInt(n) + 1;
      token["attributes"] = tokenAttributes;

      // Add token to the metadata array (collection trait list)
      metadata.push(token);
    }

    // Parse metadata as JSON
    const jsonMetadata = JSON.stringify(metadata);
    console.log("Randomly created collection .json:", jsonMetadata);

    // 2. From the metadata, create all the tokens and buffer the collection in the local storage

    //   png = x;
    //   for (item in metadata){
    //     for (trait in collection.traits){
    //       if (trait.name = item){
    //         get png from trait.URL
    //         overlap png in png
    //       }
    //     }
    //   }
    //   save png in png
    // }

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
