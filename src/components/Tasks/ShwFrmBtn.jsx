import React from "react";
import "./ShwFrmBtn.css";

const ShwFrmbtn = ({ frm, setfrm }) => {
  return (
    <button
      className={`Shwbtn ${frm ? "active" : ""}`}
      onClick={() => {
        setfrm(!frm);
      }}
    >
      +
    </button>
  );
};

export default ShwFrmbtn;
