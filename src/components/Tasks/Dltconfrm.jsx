import React from "react";
import "./dltconfrm.css";

const Dltconfrm = ({ dlt, eID, delt, setdlt }) => {
  const clrdlt = () => {
    dlt(eID);
    setdlt(false);
  };
  return (
    <div className={`DltCont ${delt ? "active" : ""}`}>
    <div className="dltC">
      <h2>Are you sure want to Delete this?</h2>
      <div>
        <button onClick={() => setdlt(!delt)}className="no">No</button>
        <button onClick={() => clrdlt()} className="yes">Yes</button>
      </div>
    </div>
    </div>
  );
};

export default Dltconfrm;
