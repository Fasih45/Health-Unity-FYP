import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Hardhat from "./Hardhat";
import Uploadtest from "./Uploadtest";

export default function UploadTestrecord() {
  const [patientId, setPatientId] = useState(null);

  const handleButtonClick = () => {
    setPatientId("test1");
  };

  return (
    <>
      {!patientId&&<div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          upload test
        </button>
        <div>Patient ID: {patientId}</div>
      </div>}
      {patientId && <Uploadtest patientId={patientId} setPatientId={()=>setPatientId(null)}  />}
    </>
  );
}
