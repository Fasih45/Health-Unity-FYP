import React, { useEffect, useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createPrescription } from "../redux/actions/prescriptionAction";
import Swal from "sweetalert2";

export const Pdfviewer = ({ id ,setPatientId }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [viewPdf, setViewPdf] = useState(null);
  const [title, settitle] = useState('');
  const [titleerror, settitleerror] = useState('');
  const [MenuFlag, setMenuFlag] = useState(true);
  const [testdate, settestdate] = useState(new Date().toISOString().split('T')[0]);
  // Change handler for the input
  const handleChangetitle = (e) => {
    settitle(e.target.value);
    settitleerror('');
  };

 
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

  const handleSavePdf = async (event) => {
    event.preventDefault();

    if (title.trim() === '') {
      settitleerror('Title should not be empty!');
      return;
    } else if (pdfFile === null) {
      setPdfFileError("Please select  PDF file");
      return;

    }

    // settestdata(new Date());
   


    const formData = new FormData();
    formData.append("title", title);
    console.log('title', title);
    formData.append("id", id);
    console.log('id', id);
    formData.append("date", testdate);
    console.log('testdate', testdate);
    formData.append("file", file);
    

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // console.log(result);
    if (result.data.status === "ok") {
      Swal.fire("Test Records Updloaded Successfully!", "", "success");
      setPatientId();
    }
  };

  return (
    <>
    
      <div class="fixed  z-50 w-full inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
        <div class="relative top-40  mx-auto shadow-xl rounded-md bg-white max-w-xl">
          <div class="flex justify-end p-2">
            <button
              onClick={() => setPatientId()}
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>

          <div class="p-6 pt-1  ">
            <form className="form-group" onSubmit={handlePdfFileSubmit}>
              <div className="pb-4">
                <label className="mb-4 ml-4">Enter title of Test:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Title"
                  value={title}
                  onChange={handleChangetitle}
                  className={`bg-gray-100 rounded-full w-full border-b-2 px-4 py-2 `}

                />
                {titleerror && (
                  <div className="error-msg text-red-600">{titleerror}</div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  className="form-control"
                  required
                  onChange={handlePdfFileChange}
                />
                {pdfFileError && (
                  <div className="error-msg text-red-600">{pdfFileError}</div>
                )}

              </div>
              <div className="pt-5 ">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  View PDF
                </button>
              </div>
            </form>
            <div className="pt-4">
              <button
                onClick={handleSavePdf}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                SAVE
              </button>
            </div>


            <div className="pdf-container">
              {viewPdf && (
                <>
                  <h4>View PDF</h4>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={viewPdf}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </>
              )}

            </div>

          </div>

        </div>
      </div>
    
    </>
    
  );
};

export default Pdfviewer;
