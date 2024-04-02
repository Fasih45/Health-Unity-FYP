import React, { useEffect } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from "react";
export default function PresDetails({ pres, setviewdetail }) {
  useEffect(() => {
    console.log("Details:", pres);
  }, [pres]);


  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector('.actual-receipt');
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('receipt.pdf');
    })
  }



  const { date, des, predata, testbydoc, writtenBydoctor } = pres;

  return (
    <>
      <div className="actual-receipt bg-white p-6  h-full rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Persection Details
        </h2>
        {/* Divider Line */}
        <hr className="my-4 border-t border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <InfoItem label="Writtenby Doctor" value={writtenBydoctor} />
          <InfoItem label="Date" value={date} />
          <InfoItem label="Description" className=" text-justify" value={des} />

          {testbydoc.length > 0 ? (
            <InfoItem
              label="Recommended Test by Doctor"
              value={testbydoc.map((item) => item.trim()).join(", ")}
            />
          ) : (
            <InfoItem
              label="Recommended Test by Doctor"
              value="No test recommended"
            />
          )}
        </div>
        {/* predata array  */}
        <h2 className="text-xl font-semibold mt-10 text-gray-800 mb-4">
          Medicine Details
        </h2>
        {/* Divider Line */}
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Medicine Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Doz
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Timing
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {predata.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.medcinename}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.doz}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.timing.map((item) => item.trim()).join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <button
            className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? (
              <span>Saving </span>
            ) : (
              <span> Save as PDF</span>
            )}
          </button>
        </div>
        <div>
          <button
            onClick={() => setviewdetail(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>

    </>
  );
}

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-lg font-semibold text-gray-800">{label}:</p>
    <p className="text-sm text-gray-600">{value}</p>
  </div>
);
