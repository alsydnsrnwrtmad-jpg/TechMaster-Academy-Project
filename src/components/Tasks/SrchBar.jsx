import React from "react";
import "./SrchBar.css";

const SrchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="cont">
      <label className="srchlab">Search Tasks</label>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
export default SrchBar;
