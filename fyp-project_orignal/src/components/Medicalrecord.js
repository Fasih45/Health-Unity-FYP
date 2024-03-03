import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Hardhat from "./Hardhat";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import MedicalRecord from "./MedicalRecordx";
import { useDispatch } from "react-redux";
import { setkeypair } from "../redux/actions/prescriptionAction";

const Medicalrecord = () => {
  const [Apiwrite, setcall] = useState(null);
  const [specificState, setSpecificState] = useState(false);
  const [listRecord, setListRecord] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, username } = useParams();
  const handledelet = (e) => {
    Swal.fire({
      title: "Rejected!",
      width: "20em",
      text: "Operation is Rejected",
      icon: "error",
    }).then(() => {
      // Call handleonclose function here
      // handleonclose(fieldid);
    });
  };
  useEffect(() => {
    if (Apiwrite === "no") {
      setSpecificState(false);
      handledelet();
    } else if (Apiwrite) {
      console.log("id:", Apiwrite);
      setSpecificState(false);
      setListRecord(Apiwrite);///apiwrite contain the key
      dispatch(setkeypair(Apiwrite));
      navigate(`record`);
    }
  }, [ Apiwrite]);
  return (
    <>
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Medicalrecord:
        </h2>
        {/* Divider Line */}
        <hr className="my-4 border-t border-gray-300" />
        <button
          onClick={() => {
            setSpecificState(true)
          
          }}

          className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
        >
          view record
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"></div>
      </div>
      {specificState && <Loader isLoading={specificState} />}
      {specificState &&<Hardhat
        setcall={(message) => {
          setcall(message);
        }}
        getKey={username}
       
      />}
      {listRecord&&<MedicalRecord/>}
    </>
  );
};

export default Medicalrecord;
