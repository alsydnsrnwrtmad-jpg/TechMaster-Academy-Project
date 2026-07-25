import React, { useState } from "react";
import "./FltrTasks.css";

const FltrTasks = ({setfltr,fltr}) => {
  return (
    <div className={`fltcont`} >
      <button onClick={() => setfltr(fltr === "Low" ? "" : "Low")} className={`lowbtn ${fltr}`}>Low</button>

      <button onClick={() => setfltr(fltr === "Medium" ? "" : "Medium")} className={`medbtn ${fltr}`}>
        Medium
      </button>

      <button onClick={() => setfltr(fltr === "High" ? "" : "High")} className={`hibtn ${fltr}`}>
        High
      </button>
    </div>
  );
};

export default FltrTasks;
