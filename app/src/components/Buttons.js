import React from "react";
import { createMetadata, createImages } from "../../static/app/utils";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function Buttons(props) {
  const { state } = props;

  async function saveChanges() {
    // Input filter: inputs must not be empty
    for (const attribute of state["attributes"]) {
      if (attribute["trait_type"] == "")
        return alert("Some type fields are empty");
      for (const trait of attribute["traits"])
        if (trait["img"] == "" || trait["value"] == "" || trait["rarity"] == "")
          return alert("Some trait fields are empty");
    }

    // Input filter: Trait values in a same type must be unique
    for (const type of state.attributes) {
      const setValues = new Set();
      for (const trait of type.traits) {
        if (setValues.has(trait.value))
          return alert("Trait values must be unique for each type set");
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
    if (rarityIsValid == false) return alert("Rarities must add up 100");

    // Fetch user inputs to the backend
    const response = await fetch("/save", {
      method: "POST",
      body: JSON.stringify({ ...state }),
    });
    const result = await response.json();
    return console.info(result);
  }

  async function createCollection() {
    const supply = state.supply;
    const attributes = state.attributes;

    // Filter valid supply input
    let maxSupply = 0;
    for (const type of state.attributes) maxSupply += type.traits.length;
    if (supply > maxSupply)
      return alert(
        `Supply is too large: Your collection has a maximum of ${maxSupply} unique combinations`
      );
    if (supply == "" || supply <= 0) return console.info("Enter valid supply");

    // Create  metadata
    const metadata = createMetadata(supply, attributes);
    const jsonMetadata = JSON.stringify(metadata);

    // Create b64 tokens
    const b64Images = await createImages(state, metadata);

    // Convert to png images
    const pngImages = [];
    let id = 1;
    for (const b64Image of b64Images) {
      // Declare function
      function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]); //atob is deprecated in node but not in the browser
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }

      // Use function:
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

    // Print some info about the download in the console
    console.info("Downloaded metadata:", jsonMetadata);
    console.info("Downloaded images:", pngImages);
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
