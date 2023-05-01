import React from "react";
import axios from "axios";

async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function (event) {
    const dataURL = event.target?.result as ArrayBuffer;

    try {
      await axios.post("https://heic-upload.onrender.com/upload", dataURL, {
        headers: { "Content-Type": "application/octet-stream" },
      });
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  reader.readAsArrayBuffer(file);
}

function UploadForm() {
  return (
    <form>
      <label htmlFor="file-input">Upload HEIC file:</label>
      <input
        name="file"
        id="file-input"
        type="file"
        accept=".heic,.heif"
        onChange={handleFileSelect}
      />
    </form>
  );
}

export default UploadForm;
