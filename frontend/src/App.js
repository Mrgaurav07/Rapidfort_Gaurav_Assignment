import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("http://backend:3000/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    setResponse(data);
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Word to PDF Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Convert</button>

      {response && (
        <div>
          <h2>File Metadata:</h2>
          <p>Original Name: {response.metadata.originalName}</p>
          <p>Size: {response.metadata.size} bytes</p>
          <a href={response.pdfUrl} download>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
