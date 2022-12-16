import React from "react";
import {
  createMetadata,
  createLayeredTokens,
  mergeLayeredTokens,
} from "../../static/app/utils";

function Buttons(props) {
  const { state } = props;

  async function saveChanges() {
    // Input filter: inputs must not be empty
    let nullValues = false;
    for (const attribute of state["attributes"]) {
      if (attribute["trait_type"] == "") nullValues = true;
      for (const trait of attribute["traits"])
        if (trait["img"] == "" || trait["value"] == "" || trait["rarity"] == "")
          nullValues = true;
    }
    if (nullValues == true) return alert("Some fields are empty");

    // Input filter: rarity total must add 100
    let rarityIsValid = false;
    let total = 0;
    for (const attribute of state["attributes"]) {
      rarityIsValid = false;
      total = 0;
      for (const trait of attribute["traits"]) {
        const rarity = parseInt(trait["rarity"]);
        if (typeof rarity == "number" && rarity >= 0) total += rarity;
      }
      if (total != 100) break;
      rarityIsValid = true;
    }
    if (rarityIsValid == false) return alert("Rarities must add up 100");

    // Fetch user inputs to the backend
    if (nullValues == false && rarityIsValid == true) {
      const response = await fetch("/save", {
        method: "POST",
        body: JSON.stringify({ ...state }),
      });
      const result = await response.json();
      return console.info(result);
    }
  }

  function createCollection() {
    const supply = state.supply;
    const attributes = state.attributes;

    // Filter valid input
    if (supply == "" || supply <= 0) return console.info("Enter valid supply");

    // Create colection's metadata
    const metadata = createMetadata(supply, attributes);
    const jsonMetadata = JSON.stringify(metadata);
    console.log("Collection's metadata:", jsonMetadata);

    // Create tokens from the metadata
    const layeredTokens = createLayeredTokens(state, metadata);
    console.log(`Collection's layered tokens:`, layeredTokens);

    // Merge tokens
    const mergedTokens = mergeLayeredTokens(layeredTokens);
    console.log(`Collection's tokens:`, mergedTokens);

    //_______[2] Create folder and include every token.png___________________________________________________________________________

    // ______________________________________________________________________________________________________________________________

    // 3. Download files

    // // Download folder containing all tokens.png

    // // Download metadata.json file
    // const blob = new Blob([jsonMetadata], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.download = "metadata.json";
    // link.href = url;
    // link.click();
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
