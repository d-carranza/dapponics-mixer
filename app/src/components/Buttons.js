import React from "react";
import {
  areChangesSaved,
  createMetadata,
  createImages,
  dataURLtoFile,
} from "../../static/app/utils";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function Buttons(props) {
  const { state } = props;

  async function saveChanges() {
    // Input filter: inputs must not be empty
    for (const attribute of state["attributes"]) {
      if (attribute["trait_type"] == "")
        return alert("Empty values: Some type fields are empty.");
      for (const trait of attribute["traits"])
        if (trait["img"] == "" || trait["value"] == "" || trait["rarity"] == "")
          return alert("Empty values: Some trait fields are empty.");
    }

    // Input filter: Trait values in a same type must be unique
    for (const type of state.attributes) {
      const setValues = new Set();
      for (const trait of type.traits) {
        if (setValues.has(trait.value))
          return alert(
            "Duplicated values: Trait values must be unique for each type set."
          );
        setValues.add(trait.value);
      }
    }

    // Input filter: rarity total must add 100
    let rarityIsValid = false,
      total = 0;
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
    if (rarityIsValid == false)
      return alert("Incorrect rarities: Same type rarities must add up 100.");

    // Fetch user inputs to the backend
    const response = await fetch("/save", {
      method: "POST",
      body: JSON.stringify({ ...state }),
    });
    const result = await response.json();
    return alert(result["message"]);
  }

  async function createCollection() {
    const supply = state.supply;
    const attributes = state.attributes;

    // Require changes to be saved
    const changesSaved = await areChangesSaved(state);
    if (!changesSaved)
      return alert("Save your changes before creating your collection.");

    // Require user to modify default state
    if (attributes[0].trait_type == "")
      return alert("Enter your traits before creating your collection.");

    // Filter valid supply input
    let maxSupply = 1;
    for (const type of state.attributes)
      if (type.traits.length > 0) maxSupply *= type.traits.length;
    if (supply > maxSupply)
      return alert(
        `Supply too large: Your collection has a maximum of ${maxSupply} unique combinations.`
      );
    if (supply == "" || supply <= 0 || (supply * 2) % 2 != 0)
      return alert("Invalid Supply: Enter a valid value.");

    // Create  metadata
    const metadata = createMetadata(supply, attributes);
    const jsonMetadata = JSON.stringify(metadata);

    // Create and merge token's base64 images
    const b64Images = await createImages(state, metadata);

    // Convert b64 to png images
    const pngImages = [];
    let id = 1;
    for (const b64Image of b64Images) {
      const file = dataURLtoFile(b64Image, `${id}.png`);
      id++;
      pngImages.push(file);
    }

    // Download files with Jszip and FileSaver libraries
    const zip = new JSZip();
    zip.file("metadata.json", jsonMetadata); // Add metadata.json
    const img = zip.folder("images"); // Add ordered .pngs to "images" root
    let n = 1;
    for (const pngImage of pngImages)
      img.file(`${n}.png`, pngImage, { base64: true }), n++;

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "mixer-collection");
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
