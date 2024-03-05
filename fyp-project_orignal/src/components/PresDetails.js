import React, { useEffect } from "react";

export default function PresDetails({ pres }) {
  useEffect(() => {
    console.log("Details:", pres);
  }, [pres]);

  return <div>PresDetails</div>;
}
