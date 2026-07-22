import React from "react";
import "./NsrchBar.css";

const NsrchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="con">
      <label className="srchlabl">Search Tasks</label>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
export default NsrchBar;
