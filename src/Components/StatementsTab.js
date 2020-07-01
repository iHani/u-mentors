import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Chart from "./Chart";

export default function () {
  const [chartData, setChartData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          const view = new Int8Array(binaryStr);
          const rows = String.fromCharCode.apply(null, view);

          parseStatement(rows);
          //   console.log(rows.split(/\r?\n/)[1]);
        };
        reader.readAsArrayBuffer(file);
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    function parseStatement(rows) {
      let labels = new Set();

      rows.split(/\r?\n/).forEach((row, i) => {
        if (i !== 0) {
          const timestamp = row.split(",")[5];
          const dateSplit = `${new Date(timestamp)}`.split(" ");
          if (dateSplit[1] && dateSplit[2] && dateSplit[3]) {
            const date = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[3];
            labels.add(date);
          }
        }
      });
      console.log(Array.from(labels).sort());

      const chartData = {
        labels: Array.from(labels).sort(),
        tasksData: [],
        earningData: [],
      };
      setChartData(chartData);
    }

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
      <div className="tab-content" id="myTabContent">
        <div className="py-2">
          <MyDropzone />
          <p>Uploaded file:</p>
          <ul>
            {uploadedFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>

        <div className="py-2">
          <Chart {...chartData} />
        </div>
      </div>
    </div>
  );
}
