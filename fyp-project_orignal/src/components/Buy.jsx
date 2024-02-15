import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { registerAppointmentCheck, registerAppointmentTimingCheck } from "../redux/actions/appointmentAction";

const Buy = ({ state, setdoc, setcall, setappointment, acceptAppointment }) => {
  const { user, username } = useParams();
  const setDoc = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0") };

    try {
      const transaction = await contract.addDoctor(username);
      await transaction.wait();
      alert("Transaction is successful");
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      if (error.message.includes("insufficient funds")) {
        alert("Insufficient funds. Please make sure you have enough Ether.");
      } else if (error.message.includes("Please pay more than 0 ether")) {
        alert("Please pay more than 0 ether");
      } else {
        alert(error);
      }
    }
  };

  const setAppointment = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.05") };

    try {
      const transaction = await contract.bookAppointment(
        username,
        setappointment.doctorName,
        amount
      );
      await transaction.wait();
      alert("Transaction is successful");
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      if (error.message.includes("insufficient funds")) {
        alert("Insufficient funds. Please make sure you have enough Ether.");
      } else if (error.message.includes("Please pay more than 0 ether")) {
        alert("Please pay more than 0 ether");
      } else {
        alert(error);
      }
    }
  };
  const acceptsAppointment = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.05") };

    try {
      const transaction =
        acceptAppointment.value === true
          ? await contract.acceptbydocter(
              acceptAppointment.patientName,
              acceptAppointment.doctorName
            )
          : await contract.rejectbydocter(
              acceptAppointment.patientName,
              acceptAppointment.doctorName
            );
      await transaction.wait();
      alert("Transaction is successful");
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      if (error.message.includes("insufficient funds")) {
        alert("Insufficient funds. Please make sure you have enough Ether.");
      } else if (error.message.includes("Please pay more than 0 ether")) {
        alert("Please pay more than 0 ether");
      } else {
        alert(error);
      }
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.contract && setdoc) {
      console.log("addDoc called");
      setDoc();
    }
    if (state.contract && setappointment) {
      console.log(
        "setappointment called",
        setappointment.value,
        setappointment.doctorName
      );
      let response = dispatch(registerAppointmentCheck(setappointment.FormData));
      response.then((result) => {
        if (result === 200) {
          console.log("yes",result);
          setAppointment();
        } else {
          console.log("no",result);
          setcall("no");
        }
      });
      
    }

    if (state.contract && acceptAppointment) {
      console.log(
        "acceptAppointment called",
        acceptAppointment.value,
        acceptAppointment.patientName,
        acceptAppointment.doctorName
      );
      let response = dispatch(registerAppointmentTimingCheck(acceptAppointment));
      response.then((result) => {
        if (result === 200) {
          console.log("yes",result);
          acceptsAppointment();
        } else {
          console.log("no",result);
          setcall("no");
        }
      });
      


      
    }
  }, [state.contract]);

  return <></>;
};

export default Buy;
