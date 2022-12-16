import mergeImages from "merge-images";

// TODO: Avoid duplicates while creating the metadata (toggle?)
export function createMetadata(supply, attributes) {
  const metadata = [];

  for (let n = 0; n < supply; n++) {
    const token = {};
    const tokenAttributes = [];

    // Get one trait for each type
    for (const type of attributes) {
      // Set the rarities and values for this trait_type
      const traitAttributes = {};
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

        // console.log(rarities, values, r, values[i]); // Print for debugging
        return values[i];
      }

      // Add trait_type and value pairs to the attributes parent
      traitAttributes["trait_type"] = type.trait_type;
      traitAttributes["value"] = randvalue();
      tokenAttributes.push(traitAttributes);
    }

    // Define token number and attributes
    token["token_id"] = parseInt(n) + 1;
    token["attributes"] = tokenAttributes;

    // Add token to the metadata array (collection trait list)
    metadata.push(token);
  }
  return metadata;
}

export async function createTokens(state, metadata) {
  // 1. Get an array containing arrays for every token's trait dataURLs.
  const dataUrlArrays = [];

  // For each metadata's attribute
  for (const token of metadata) {
    const attributes = token.attributes;
    const tokenbase64pnglist = [];
    const traitPairs = {};

    for (const attribute of attributes) {
      const key = attribute["trait_type"];
      const value = attribute["value"];
      traitPairs[key] = value;
    }
    const keys = Object.keys(traitPairs);

    for (const key of keys) {
      // Find the same attribute in the state
      for (const stateAttrib of state.attributes) {
        // Find the same trait
        if (stateAttrib["trait_type"] == key) {
          for (const trait of stateAttrib.traits) {
            for (const attribute of attributes) {
              if (trait["value"] == attribute["value"])
                // Push it's img in the img array
                tokenbase64pnglist.push(trait.img);
            }
          }
        }
      }
    }
    // And push the array to the whole collection
    dataUrlArrays.push(tokenbase64pnglist);
  }

  // 2. Merge images to create the final image for every token
  const allMergedTokens = [];
  for (const dataUrlArray of dataUrlArrays) {
    const image = await mergeImages(dataUrlArray);
    allMergedTokens.push(image);

    // console.log(image); // DEBUGGER CONSOLE.LOG
  }
  //The output of this function is the array wit all the merged token's dataUrls
  return allMergedTokens;
}
