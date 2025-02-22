import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [video, setVideo] = useState(null);
  const [outputUrl, setOutputUrl] = useState("");

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOutputUrl(response.data.output);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2>Upload Video for Speed Detection</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {outputUrl && (
        <div>
          <h3>Processed Video:</h3>
          <video controls width="600">
            <source src={`http://localhost:5000${outputUrl}`} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Upload;
