import React, { useEffect, useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createPrescription } from "../redux/actions/prescriptionAction";

export const Pdfviewer = ({id}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [viewPdf, setViewPdf] = useState(null);

  const fileType = ["application/pdf"];
  useEffect(() => {
    // dispatch(getPrescription("23876876381683"));
    console.log("data:", id);
  }, [id]);
  const handlePdfFileChange = (e) => {
    setFile(e.target.files[0])
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select a valid PDF file");
      }
    } else {
      console.log("Select your file");
    }
  };

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  const handleSavePdf =async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", "abc");
    formData.append("id", id);
    formData.append("file", file);
    console.log("formdata", formData);

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
     
    }
  };

  return (
    <div className="container mx-auto p-4">
      <br />
      <form className="form-group" onSubmit={handlePdfFileSubmit}>
        <input
          type="file"
          className="form-control"
          required
          onChange={handlePdfFileChange}
        />
        {pdfFileError && (
          <div className="error-msg text-red-600">{pdfFileError}</div>
        )}
        <br />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          UPLOAD
        </button>
      </form>
      <button
        onClick={handleSavePdf}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        SAVE
      </button>
      <br />
      <h4>View PDF</h4>
      <div className="pdf-container">
        {viewPdf && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer
                fileUrl={viewPdf}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )}
        {!viewPdf && <>No PDF file selected</>}
      </div>
    </div>
  );
};

export default Pdfviewer;
