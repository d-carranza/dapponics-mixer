import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// 1. Make frontend to work well -> file goes to a constant
// 2. useEffect() when file is stored -> cloudinary upload
// 3. cloudinary URL -> img.value = URL

// 4. Populate the img if URL exists in the backend

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
