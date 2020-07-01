import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Chart from "./Chart";

export default function () {
  const [status, setStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  //   const [tab, setTab] = useState("Charts");

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      console.log("acceptedFiles", acceptedFiles);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          const view = new Int8Array(binaryStr);
          const str = String.fromCharCode.apply(null, view);

          console.log(str.split(/\r?\n/));
        };
        reader.readAsArrayBuffer(file);
      });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div className="statement-container text-center pt-3" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop them here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    );
  }

  return (
    <div className="container py-2 white-bg">
      {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link px-5 ${tab === "Charts" ? "active" : ""}`}
            id="charts-tab"
            data-toggle="tab"
            href="#charts"
            role="tab"
            aria-controls="charts"
            aria-selected="false"
            onClick={() => setTab("Charts")}
          >
            Charts
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link px-5 ${tab === "Files" ? "active" : ""}`}
            id="files-tab"
            data-toggle="tab"
            href="#files"
            role="tab"
            aria-controls="files"
            aria-selected="true"
            onClick={() => setTab("Files")}
          >
            Files
          </a>
        </li>
      </ul> */}
      <div className="tab-content" id="myTabContent">
        <div className="py-2">
          <MyDropzone />
          <p>Uploaded files:</p>
          <ul>
            {uploadedFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>

        <div className="py-2">
          <Chart />
        </div>
      </div>
    </div>
  );
}
