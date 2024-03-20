import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTrustedMedicalLab,
  getTrustedMedicalLabRequest,
  removeLabFromPatientTrustedList,
} from "../redux/actions/patientTrustedlistforLabAction";
import Hardhat from "./Hardhat";
import Loader from "./Loader";
import Swal from "sweetalert2";
import LabViewProfile from "./LabViewProfile";
import { getProfileMedicalLab } from "../redux/actions/searcProfileAction";

export default function TrustedLab() {
  const [specificState, setSpecificState] = useState(false);
  const [labName, setlabName] = useState("");
  const [Apiwrite, setcall] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, username } = useParams();
  const { singleprofileMedicalLab, statuscode } = useSelector(
    (state) => state.searchProfile
  );
  const list = useSelector(
    (state) => state.patientTrustedListforLab.trustedMedicalLabs
  );
  const statusCode = useSelector(
    (state) => state.patientTrustedListforLab.statusCode
  );
  const [viewprofile, setviewprofile] = useState(null);
  useEffect(() => {
    dispatch(getTrustedMedicalLab(username));
  }, [dispatch, username]);
  useEffect(() => {
    console.log("data:", list);
  }, [list]);
  const handleSave = () => {
    Swal.fire({
      title: "Success!",
      width: "20em",
      text: "Your operation is complted.",
      icon: "success",
    }).then(() => {});
  };
  const handledelet = (e) => {
    Swal.fire({
      title: "Rejected!",
      width: "20em",
      text: "Operation is Rejected",
      icon: "error",
    }).then(() => {});
  };
  useEffect(() => {
    if (statusCode === 401) {
      dispatch(getTrustedMedicalLabRequest());
      navigate(`/`);
    }
    if (statusCode === 201) {
      dispatch(getTrustedMedicalLab(username));
    }
  }, [navigate, statusCode, dispatch]);
  useEffect(() => {
    if (Apiwrite === "yes") {
      setSpecificState(false);
      dispatch(removeLabFromPatientTrustedList(username, labName));
      handleSave();
      setcall(false);
    } else if (Apiwrite === "no") {
      setSpecificState(false);
      handledelet();
      setcall(false);
    }
  }, [Apiwrite, dispatch, setSpecificState]);

  useEffect(() => {
    if (viewprofile) {
      dispatch(getProfileMedicalLab(viewprofile));
    }
  }, [viewprofile, dispatch]);
  return (
    <>
      {list && !viewprofile && (
        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
          <div className="flex flex-col justify-center rounded-full">
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                  Trusted Medical Labs
                </h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            User Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Status</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Profile</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {list?.trustedLabList?.map((lab, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                {" "}
                                <div className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                                  {lab.charAt(0)}
                                </div>
                              </div>
                              <div className="font-medium text-gray-800">
                                {lab}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              Active
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium ">
                              <button
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                                onClick={() => {
                                  setviewprofile(lab);
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
                                  setlabName(lab);
                                  setSpecificState(true);
                                }}
                                className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-500 text-white transition-colors duration-200 hover:text-red-100 focus:outline-none"
                              >
                                remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {specificState && (
        <Hardhat
          setcall={(message) => {
            setcall(message);
          }}
          removeLab={labName}
        />
      )}
      {viewprofile && singleprofileMedicalLab && (
        <LabViewProfile
          profile={singleprofileMedicalLab}
          goBack={() => setviewprofile(null)}
        />
      )}
      {specificState && <Loader isLoading={specificState} />}
    </>
  );
}
