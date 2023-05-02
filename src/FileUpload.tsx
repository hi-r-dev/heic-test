import React, { useState } from "react";
import axios from "axios";
import exifr from "exifr";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [exifData, setExifData] = useState(null);

  const onChange = async (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    try {
      const data = await exifr.parse(e.target.files[0]);
      setExifData(data);
    } catch (error) {
      console.error(error);
    }
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
        <input
          type="file"
          accept="image/heic,image/heif,image/*"
          onChange={onChange}
        />
      </div>
      <button type="submit">Upload</button>
      {fileName && <p>{fileName}</p>}
      {exifData && (
        <div>
          <p>EXIF data:</p>
          <pre>{JSON.stringify(exifData, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}

export default FileUpload;
