import React, { useEffect, useState } from "react";
import Hardhat from "./Hardhat";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrescription,
  setkeypair,
} from "../redux/actions/prescriptionAction";
import Presectionpage from "./Presectionpage";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Pdfviewer from "./Pdfviewer";

export default function Uploadtest({ patientId, setPatientId }) {
  const dispatch = useDispatch();
  const [Apiwrite, setcall] = useState(null);
  const [specificState, setSpecificState] = useState(true);
  useEffect(() => {
    // dispatch(getPrescription("23876876381683"));
    console.log("data:", patientId);
  }, [patientId]);
  const navigate = useNavigate();

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
      setPatientId();
    } else if (Apiwrite) {
      console.log("id:", Apiwrite);
      setSpecificState(false);
    }
  }, [Apiwrite]);
  return (
    <>
      {!specificState && <Pdfviewer id={Apiwrite} />}
      {specificState && <Loader isLoading={specificState} />}
      <Hardhat
        setcall={(message) => {
          setcall(message);
        }}
        getPatientkeybyLab={patientId}
      />
    </>
  );
}
