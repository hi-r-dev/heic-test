import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e: any) => {
    if (!file) return;
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "https://heic-upload.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="file" capture="camera" onChange={onChange} />
      </div>
      <button type="submit">Upload</button>
      {fileName && <p>{fileName}</p>}
    </form>
  );
}

export default FileUpload;
