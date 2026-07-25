import React from "react";
import "./SrchBar.css";
import FltrTasks from "./FltrTasks";

const SrchBar = ({ searchTerm, setSearchTerm, setfltr, fltr }) => {
  return (
    <div className="srchcont">
      <div className="cont">
        <label className="srchlab">Search Tasks</label>
        <input
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <FltrTasks setfltr={setfltr} fltr={fltr} />
    </div>
  );
};
export default SrchBar;
