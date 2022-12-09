import React, { useCallback, forwardRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import styled from "styled-components";

// Define styles for the dropzone
const getColor = (props) => {
  if (props.isDragAccept) {
    return "#68d391";
  }
  if (props.isDragReject) {
    return "#fc8181";
  }
  if (props.isFocused) {
    return "#63b3ed";
  }
  return "#e2e8f0";
};

const Container = styled.div`
  height: 122px;
  width: 122px;
  margin-bottom: 4px;
  text-align: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

// DROPZONE COMPONENT
function Dropzone(props) {
  const {
    state,
    setState,
    typeIndex,
    traitIndex,
    accept,
    maxFiles,
    showPreview,
  } = props;

  // TODO: If state has already an image, prepopulate the dropzone

  // Update state with the URL of the image
  function updateImg(imgInput) {
    const stateObject = { ...state };
    stateObject.attributes[typeIndex].traits[traitIndex].img = imgInput;
    setState(stateObject);
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    // Access to the file contents I have
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents

        const binaryStr = reader.result;

        // TODO: Upload the image to Cloudinary and get URL
        // Watch 55 minutes youtube guide

        console.log("file loaded");
        console.log(reader);
        console.log(binaryStr);
        console.log(file);

        const imgInput = "default_URL"; // TODO: Replace imgInput with cloudinary URL
        // TODO: showPreview from URL Thumb (Thumbnail)
        return updateImg(imgInput);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  // if file exists return image
  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drop png here or select file</p>
      </Container>
    </div>
  );
}

export default Dropzone;
