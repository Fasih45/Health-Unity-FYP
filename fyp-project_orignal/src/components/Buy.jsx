import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  registerAppointmentCheck,
  registerAppointmentTimingCheck,
} from "../redux/actions/appointmentAction";
import { addDoctorToList } from "../redux/actions/patientTrustedlistAction";

const Buy = ({
  state,
  setdoc,
  setmed,
  setcall,
  setappointment,
  acceptAppointment,
  removeDoc,
  write,
  getPatientkey,
  getKey,
  addLabstotrust,
  removeLab,
  getPatientkeybyLab
}) => {
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
  const setMed = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.2") };

    try {
      const transaction = await contract.addLab(username,amount);
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
  
  const addLabstotrustList= async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.2") };

    try {
      const transaction = await contract.addLabToTrustedList(addLabstotrust,username);
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
  
  const removeLabstotrustList= async () => {
    const { contract } = state;
    try {
      const transaction = await contract.removeLabToTrustedList(removeLab);
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
        alert("Plz select patient account");
      }
    }
  };

  const removeDoctor = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0") };

    try {
      const test = await contract.getHashedKeybyPatient(username);
      if (
        test.includes(
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
      ) {
        setcall("no");
        alert("Patient is Registered with different account");
        console.log(test);
      } else {
        console.log(test);
        const transaction = await contract.removeDoctorToTrustedList(
          removeDoc.name
        );
        await transaction.wait();
        alert("Transaction is successful");
        setcall("yes");
      }

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

  const writePres = async () => {
    const { contract } = state;
    try {
      const test = await contract.getHashedKeybyDoctor(getPatientkey, username);
      setcall(test);
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
  const getpatientkeybylab = async () => {
    const { contract } = state;
    try {
      const test = await contract.getHashedKeybyLabs(getPatientkeybyLab, username);
      setcall(test);
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
  
  const getOwnKey = async () => {
    const { contract } = state;
    try {
      const test = await contract.getHashedKeybyPatient(username);
      if (
        test.includes(
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
      ) {
        setcall("no");
        alert("No Record Exit with this Meta Account!");
      } else {
        console.log(test);

        alert("Acess granted");
        setcall(test);
      }

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
      if (acceptAppointment.value === true)
        dispatch(
          addDoctorToList(
            acceptAppointment.patientName,
            acceptAppointment.doctorName
          )
        );
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
    if (state.contract && setmed) {
      console.log("addmed called");
      setMed();
    }
    if (state.contract && setappointment) {
      console.log(
        "setappointment called",
        setappointment.value,
        setappointment.doctorName
      );
      let response = dispatch(
        registerAppointmentCheck(setappointment.FormData)
      );
      response.then((result) => {
        if (result === 200) {
          console.log("yes", result);
          setAppointment();
        } else {
          console.log("no", result);
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
      if (acceptAppointment.value === true) {
        let response = dispatch(
          registerAppointmentTimingCheck(acceptAppointment)
        );
        response.then((result) => {
          if (result === 200) {
            console.log("yes", result);
            acceptsAppointment();
          } else {
            console.log("no", result);
            setcall("no");
          }
        });
      } else {
        ///if  user reject the appointment with value no
        acceptsAppointment();
      }
    }
    if (state.contract && removeDoc) {
      console.log("removeDoc called:", removeDoc.name);
      removeDoctor();
    }
    if (state.contract && write) {
      console.log("write called:", write);
      writePres();
    }
    if (state.contract && getPatientkey) {
      console.log("getPatienkeycalled:", getPatientkey);
      writePres();
    }
    if (state.contract && getKey) {
      console.log("getKey:", getKey);
      getOwnKey();
    }
    if (state.contract &&addLabstotrust ) {
      console.log("addLab:", addLabstotrust);
      addLabstotrustList();
    }
    if (state.contract && removeLab) {
      console.log("removeLab:", removeLab);
      removeLabstotrustList();
    }
    if (state.contract && getPatientkeybyLab) {
      console.log("getpatientkeybylab:", getPatientkeybyLab);
      getpatientkeybylab();
    }
    
  }, [state.contract]);

  return <></>;
};

export default Buy;
