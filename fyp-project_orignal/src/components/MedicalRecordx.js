import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrustedDoctorsList,
  getTrustedDoctorsListRequest,
  removeDoctorFromList,
} from "../redux/actions/patientTrustedlistAction";
import { getProfileDoc } from "../redux/actions/searcProfileAction";
import DocViewProfile from "./DocViewProfile";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import Hardhat from "./Hardhat";
import { getPrescription } from "../redux/actions/prescriptionAction";
import PresDetails from "./PresDetails";
const MedicalRecord = () => {
  const list = useSelector((state) => state.patientPrescription.prescription);
  const [docName, setdocName] = useState("");
  const [Apiwrite, setcall] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const statusCode = useSelector(
    (state) => state.patientPrescription.statusCode
  );
  const keypair = useSelector((state) => state.patientPrescription.keypair);
  const navigate = useNavigate();
  const { singleprofile, statuscode } = useSelector(
    (state) => state.searchProfile
  );
  const { user, username, fullname } = useParams();
  const [viewprofile, setviewprofile] = useState(null);
  const [viewdetail, setviewdetail] = useState(null);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (keypair) {
      console.log("keypair", keypair);
      dispatch(getPrescription(keypair, currentPage));
    } else {
      navigate(`/welcome/${user}/${username}/${fullname}`);
    }
  }, [dispatch, username, currentPage]);
  useEffect(() => {
    if (viewprofile) {
      dispatch(getProfileDoc(viewprofile));
    }
  }, [viewprofile, dispatch]);
  useEffect(() => {
    console.log("list:", list);
  }, [list]);

  useEffect(() => {
    if (statusCode === 401) {
      navigate(`/`);
      dispatch(getTrustedDoctorsListRequest());
    }
  }, [navigate, statusCode, dispatch]);
  return (
    <>
      {list  &&  !viewprofile && !viewdetail && (
        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
          <div className="flex flex-col justify-center ">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                  Medical Record:{" "}
                </h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">N0.</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Doctor Name
                          </div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Profile</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            view details
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {list?.length > 0?
                      list?.map((pres, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className=" w-10 text-left font-medium text-black-500">
                              {index + 1}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className=" h-10 flex-shrink-0 mr-2 sm:mr-3">
                                {" "}
                                <div className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                                  {pres?.writtenBydoctor?.charAt(0)}
                                </div>
                              </div>
                              <div className="font-medium text-gray-800">
                                {pres?.writtenBydoctor}
                              </div>
                            </div>
                          </td>

                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium ">
                              <button
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                                onClick={() => {
                                  setviewprofile(pres?.writtenBydoctor);
                                }}
                              >
                                View Profile
                              </button>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">
                              {" "}
                              <button
                                onClick={() => {
                                  setviewdetail(pres);
                                }}
                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-blue-500 text-white transition-colors duration-200 hover:text-blue-100 focus:outline-none"
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      )):null}
                    </tbody>
                  </table>
                  <div className="px-5 pt-8 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs text-gray-900">
                      Page {currentPage}{" "}
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
          onClick={()=>{navigate(-1);}}
          className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
        >
          Go Back
        </button>
        </section>
      )}

      {viewprofile && singleprofile && (
        <DocViewProfile docProfile={singleprofile} goBack={() => setviewprofile(null)} />
      )}
      {viewdetail && <PresDetails pres={viewdetail} />}
     
    </>
  );
};

export default MedicalRecord;
