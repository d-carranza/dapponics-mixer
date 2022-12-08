import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop png here or select file</p>
      )}
    </div>
  );
}

export default Dropzone;
