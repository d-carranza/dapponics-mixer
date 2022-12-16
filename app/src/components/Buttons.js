import React from "react";
import { createMetadata, createImages } from "../../static/app/utils";

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

  async function createCollection() {
    const supply = state.supply;
    const attributes = state.attributes;

    // Filter valid input
    TODO: "Your supply is larger than your collection's combinations";
    if (supply == "" || supply <= 0) return console.info("Enter valid supply");

    // Create  metadata
    const metadata = createMetadata(supply, attributes);
    const jsonMetadata = JSON.stringify(metadata);
    console.log("New Collection's metadata:", jsonMetadata);

    // Create b64 tokens
    const b64images = await createImages(state, metadata);
    console.log(`New Collection's tokens:`, b64images);

    // Create png images
    const images = [];
    let id = 1;
    for (const b64image of b64images) {
      // Declare function
      function dataURLtoFile(dataurl, filename) {
        //WARNING: Very old and obsolete method
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }

      //Use function:
      const file = dataURLtoFile(b64image, `${id}.png`);
      id++;
      images.push(file);
    }
    console.log(`New Collection's pngs:`, images);

    // _______DOWNLOAD FILES__________

    // 1 - Make a folder called "images"

    // 2 - Drop every element from "images" array into the folder "images"

    // 3 - Make a folder called "mixer-collection"

    // 4 - Drop "metadata.json" and "images" folder into the folder "mixer-collection"

    // _____________Download metadata snippet________________
    // // Download metadata.json file
    // const blob = new Blob([jsonMetadata], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.download = "metadata.json";
    // link.href = url;
    // link.click();
    // ______________________________________________________
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
