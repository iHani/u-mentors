import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Chart from "./Chart";

export default function () {
  const [chartData, setChartData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [totalTasks, setTotalTasks] = useState(null);
  const [totalEarning, setTotalEarning] = useState(null);

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        // reader.onabort = () => console.log("file reading was aborted");
        // reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          const view = new Int8Array(binaryStr);
          const rows = String.fromCharCode.apply(null, view);
          parseStatement(rows);
        };
        reader.readAsArrayBuffer(file);
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    function parseStatement(rows) {
      if (rows == null || rows.split(",").length < 2) return;

      let labelsObj = {};
      rows.split(/\r?\n/).forEach((row, i) => {
        if (i !== 0) {
          const timestamp = row.split(",")[5];
          const dateSplit = `${new Date(timestamp)}`.split(" ");
          if (dateSplit[1] && dateSplit[2] && dateSplit[3]) {
            const date = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[3];
            const d = labelsObj[date];
            labelsObj[date] = {
              tasks: d ? d.tasks + 1 : 1,
              earning: d
                ? d.earning + Number(row.split(",")[7])
                : Number(row.split(",")[7]),
            };
          }
        }
      });
      const totTasks = Object.values(labelsObj)
        .map(({ tasks }) => tasks)
        .reduce((total, num) => total + num);
      const totEarning = Object.values(labelsObj)
        .map(({ earning }) => earning)
        .reduce((total, num) => total + num);
      setChartData(labelsObj);
      setTotalEarning(totEarning);
      setTotalTasks(totTasks);
    }

    return (
      <div className="statement-container text-center pt-3" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop them here ...</p>
        ) : (
          <p>Drag 'n' drop a statement file as .csv (one file at a time)</p>
        )}
      </div>
    );
  }

  return (
    <div className="container py-2 white-bg">
      <div className="tab-content" id="myTabContent">
        <div className="py-2">
          <MyDropzone />
          <ul>
            {uploadedFiles.map((file, i) => (
              <li key={i}>File: {file.name}</li>
            ))}
          </ul>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="py-2 d-flex justify-content-center">
            <span className="mx-2">
              Total Tasks: <b>{totalTasks}</b>
            </span>
            <span className="mx-2">
              Total Earning: <b>${totalEarning}</b>
            </span>
          </div>
        )}
        <div className="py-2">
          <Chart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
