import React, { useEffect, useState } from "react";
import Hardhat from "./Hardhat";
import { useDispatch, useSelector } from "react-redux";
import { getPrescription, setkeypair } from "../redux/actions/prescriptionAction";
import Presectionpage from "./Presectionpage";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function WritePriscription({
  priscriptionData,
  setWritePriscription,
  forview ///used as view medical record
}) {
  const list = useSelector((state) => state.patientPrescription.statusCode);
  const dispatch = useDispatch();
  const [Apiwrite, setcall] = useState(null);
  const [specificState, setSpecificState] = useState(true);
  useEffect(() => {
    // dispatch(getPrescription("23876876381683"));
    console.log("data:", priscriptionData);
  }, []);
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
    console.log(list);
    if (Apiwrite === "no") {
      setSpecificState(false);
      handledelet();
      setWritePriscription(false)
    } else if (Apiwrite) {
      console.log("id:", Apiwrite);
      setSpecificState(false);
      if(forview){
        dispatch(setkeypair(Apiwrite));
        navigate(`Patientrecord`);
      }
    }
  }, [list, Apiwrite]);
  return (
    <>
     <div className="">

     
      {!specificState && <Presectionpage priscriptionData={priscriptionData} id={Apiwrite} />}
      {specificState && <Loader isLoading={specificState} />}
      <Hardhat
        setcall={(message) => {
          setcall(message);
        }}
        getPatientkey={priscriptionData?.patientUsername}
      />
      </div>
    </>
  );
}
