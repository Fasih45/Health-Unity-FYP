import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader";
import Hardhat from "./Hardhat";
import { addLabToPatientTrustedList } from "../redux/actions/patientTrustedlistforLabAction";

export default function AddLabstotrust(props) {
  const statusCode = useSelector(
    (state) => state.patientTrustedListforLab.statusCode
  );
  const { user, username } = useParams();
  useEffect(() => {
    console.log("statuscode", statusCode);

  }, [statusCode]);
  const dispatch = useDispatch();
  const [Apiwrite, setcall] = useState(null);
  const [specificState, setSpecificState] = useState(true);
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
  const handleSave = () => {
    Swal.fire({
      title: "Success!",
      width: "20em",
      text: "Your operation is complted.",
      icon: "success",
    }).then(() => {});
  };
  useEffect(() => {
    if (Apiwrite === "no") {
      setSpecificState(false);
      handledelet();
      props.setaddlabtrust(false);
      //setWritePriscription(false)
    } else if (Apiwrite) {
      setSpecificState(false);
      dispatch(addLabToPatientTrustedList(username,props.data))
      handleSave();
      props.setaddlabtrust(false);
    }
  }, [Apiwrite]);
  return (
    <>
    {specificState && <Loader isLoading={specificState} />}
    
      <div>AddLabstotrust</div>
      <Hardhat
        setcall={(message) => {
          setcall(message);
        }}
        addLabstotrust={props.data}
      />
    </>
  );
}
