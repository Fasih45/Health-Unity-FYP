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
  getPatientkeybyLab,
}) => {
  const { user, username } = useParams();
  const checkBlockchainErrors = (error) => {
    if (
      error.message.includes(
        "The account with different user name is already taken!"
      )
    ) {
      alert("The account with different user name is already taken!");
    } else if (
      error.message.includes(
        "Patient name already registered with a different address"
      )
    ) {
      alert("Patient name already registered with a different address");
    } else if (
      error.message.includes("Please pay 0.2 ether for registration")
    ) {
      alert("Please pay 0.2 ether for registration");
    } else if (
      error.message.includes(
        "Lab name already registered with a different address"
      )
    ) {
      alert("Lab name already registered with a different address");
    } else if (
      error.message.includes(
        "Doctor name already registered with a different address"
      )
    ) {
      alert("Doctor name already registered with a different address");
    } else if (error.message.includes("No lab with this name exits")) {
      alert("No lab with this name exits");
    } else if (error.message.includes("Already added to trust list")) {
      alert("Already added to trust list");
    } else if (
      error.message.includes("User registered with diferent account")
    ) {
      alert("User registered with diferent account");
    } else if (error.message.includes("No Doctor with this name exits")) {
      alert("No Doctor with this name exits");
    } else if (error.message.includes("Please pay more than 0 ether")) {
      alert("Please pay more than 0 ether");
    } else if (
      error.message.includes(
        "You had already  booked appoinment  with this doctor and it is pending "
      )
    ) {
      alert(
        "You had already  booked appoinment  with this doctor and it is pending "
      );
    } else if (error.message.includes("No pending payment exits")) {
      alert("No pending payment exits");
    } else if (error.message.includes("You are not the registered docter")) {
      alert("You are not the registered docter");
    } else if (error.message.includes("Insufficient pending payment")) {
      alert("Insufficient pending payment");
    } else if (
      error.message.includes(
        "User is already registered with a different address"
      )
    ) {
      alert("User is already registered with a different address");
    } else if (error.message.includes("Doctor account doesnot match")) {
      alert("Doctor account doesnot match");
    } else if (error.message.includes("Sorry you are not in trusted list")) {
      alert("Sorry you are not in trusted list");
    } else if (error.message.includes("Lab account doesnot match")) {
      alert("Lab account doesnot match");
    } else {
      alert(error);
    }
  };

  const setDoc = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0") };

    try {
      const docaddress = await contract.getAddress();
      alert(`you will be registered with this  ${docaddress} account`);
      localStorage.setItem(`${user}Address`, JSON.stringify(docaddress));
      const transaction = await contract.addDoctor(username);
      await transaction.wait();
      alert("Transaction is successful");
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      checkBlockchainErrors(error);
    }
  };
  const setMed = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.2") };

    try {
      const docaddress = await contract.getAddress();
      alert(
        `you will be registered with this  ${docaddress} account along some charges`
      );
      localStorage.setItem(`${user}Address`, JSON.stringify(docaddress));
      const transaction = await contract.addLab(username, amount);
      await transaction.wait();
      alert("Transaction is successful");
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      checkBlockchainErrors(error);
    }
  };

  const addLabstotrustList = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.2") };

    try {
      const transaction = await contract.addLabToTrustedList(
        addLabstotrust,
        username
      );
      await transaction.wait();
      alert("Transaction is successful");
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      checkBlockchainErrors(error);
    }
  };

  const removeLabstotrustList = async () => {
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
      checkBlockchainErrors(error);
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
      checkBlockchainErrors(error);
    }
  };

  const setAppointment = async () => {
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.05") };

    try {
      const docaddress = await contract.getAddress();
      const test = await contract.getHashedKeybyPatient(username);
      if (
        test.includes(
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
      ) {
        alert(`You user will be registered with ${docaddress} account`);
      }
      localStorage.setItem(`${user}Address`, JSON.stringify(docaddress));
      const transaction = await contract.bookAppointment(
        username,
        setappointment.doctorName,
        amount
      );
      await transaction.wait();
      alert("Transaction is successful");
      dispatch(addDoctorToList(username, setappointment.doctorName));
      setcall("yes");
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      checkBlockchainErrors(error);
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
      checkBlockchainErrors(error);
    }
  };
  const getpatientkeybylab = async () => {
    const { contract } = state;
    try {
      const test = await contract.getHashedKeybyLabs(
        getPatientkeybyLab,
        username
      );
      setcall(test);
      // window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
      setcall("no");
      checkBlockchainErrors(error);
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
      checkBlockchainErrors(error);
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
      checkBlockchainErrors(error);
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
    if (state.contract && addLabstotrust) {
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
