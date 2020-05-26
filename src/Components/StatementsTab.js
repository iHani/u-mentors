import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { newID } from './CommentsTab';

export default function () {
    const [status, setStatus] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [tab, setTab] = useState('Files');

    function MyDropzone() {
        const onDrop = useCallback(acceptedFiles => {
            setUploadedFiles(acceptedFiles);
            console.log("acceptedFiles", acceptedFiles);

        }, [])
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

        return (
            <div className="statement-container p-5 text-center" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop them here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        )
    }

    return (
        <div className="container py-2 white-bg">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={`nav-link px-5 ${tab === 'Charts' ? 'active' : ''}`} id="charts-tab" data-toggle="tab" href="#charts" role="tab" aria-controls="charts" aria-selected="false"
                        onClick={() => setTab('Charts')}>Charts</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={`nav-link px-5 ${tab === 'Files' ? 'active' : ''}`} id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="true"
                        onClick={() => setTab('Files')}>Files</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={`container py-3 tab-pane ${tab === 'Charts' ? 'fade show active' : ''}`} role="tabpanel" aria-labelledby="charts-tab">
                    charts
                </div>
                <div className={`container py-3 tab-pane ${tab === 'Files' ? 'fade show active' : ''}`} role="tabpanel" aria-labelledby="files-tab">
                    <MyDropzone />
                    <p>Uploaded files:</p>
                    <ul>
                        {uploadedFiles.map((file, i) =>
                            <li key={i}>{file.name}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}



