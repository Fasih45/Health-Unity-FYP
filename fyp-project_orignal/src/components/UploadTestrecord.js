import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Hardhat from "./Hardhat";
import Uploadtest from "./Uploadtest";
import { getTrustedPatients, getTrustedPatientsRequest } from "../redux/actions/patientTrustedlistforLabAction";

export default function UploadTestrecord() {
  const [patientId, setPatientId] = useState(null);
  const navigate = useNavigate();
  const { user, username } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(
    (state) => state.patientTrustedListforLab.trustedPatients
  );
  const statusCode = useSelector(
    (state) => state.patientTrustedListforLab.statusCode
  );
  const handleButtonClick = () => {
    setPatientId("test1");
  };
  useEffect(() => {
    dispatch(getTrustedPatients(username));
  }, [dispatch, username]);
  useEffect(() => {
    console.log("data:", list);
  }, [list]);
  useEffect(() => {
    if (statusCode === 401) {
      dispatch(getTrustedPatientsRequest());
      navigate(`/`);
    }
  }, [statusCode, dispatch,navigate]);

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
