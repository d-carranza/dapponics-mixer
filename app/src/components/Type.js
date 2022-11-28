// import React, { Component, useEffect, useState } from "react";

// function Type(props) {
//   const typeIndex = props.typeIndex;

//   function updateType(event) {
//     const stateObject = { ...state };
//     stateObject.attributes[typeIndex].trait_type = event.target.value;
//     setState(stateObject);
//   }

//   function addTrait() {
//     console.log("+ Add Trait button was clicked");
//     const stateObject = { ...state };
//     stateObject.attributes[typeIndex].traits.push({
//       img: "",
//       value: "",
//       rarity: "",
//     });
//     setState(stateObject);
//   }

//   function removeType() {
//     const stateObject = { ...state };
//     stateObject.attributes.pop(typeIndex);
//     setState(stateObject);
//   }

//   return (
//     <div className="type" key={typeIndex}>
//       <div className="typeheader">
//         <div>
//           <input
//             className="textinput"
//             value={state.attributes[typeIndex].trait_type}
//             onChange={updateType}
//             placeholder="Type Name"
//             // autoFocus={true}
//           />
//         </div>
//         <button name="removetype" className="removebtn" onClick={removeType}>
//           x
//         </button>
//       </div>
//       <div className="row">
//         {state.attributes[typeIndex].traits.map((trait, traitIndex) => (
//           <Trait
//             key={traitIndex}
//             typeIndex={typeIndex}
//             traitIndex={traitIndex}
//           />
//         ))}
//         <button className="addtrait" onClick={addTrait}>
//           +Add Trait
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Type;
