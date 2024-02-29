import React, { useEffect } from "react";
import Hardhat from "./Hardhat";
import { useDispatch, useSelector } from "react-redux";
import { getPrescription } from "../redux/actions/prescriptionAction";
import Presectionpage from "./Presectionpage";

export default function WritePriscription() {
  const list = useSelector((state) => state.patientPrescription.statusCode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrescription("23876876381683"));
  }, []);
  useEffect(() => {
    console.log(list)
  }, [list]);
  return (
    <>
      <div>WritePriscription</div>
      <Presectionpage/>

    </>
  );
}
