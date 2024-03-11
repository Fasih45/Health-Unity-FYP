import React, { useEffect } from "react";

export default function LabViewProfile(props) {
  useEffect(() => {
    console.log("state:", props.profile);
  }, [props.profile]);
  return <div>LabViewProfile</div>;
}
