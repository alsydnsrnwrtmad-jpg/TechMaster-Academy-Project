import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Dltconfrm from "../Tasks/Dltconfrm";
import "./TheNotes.css";

const TheNotes = ({ filteredNotes, dlt }) => {
  const [delt, setdlt] = useState(false);
  const [dltID, setDltID] = useState("");

  const getID = (id) => {
    setDltID(id);
    setdlt(!delt);
  };

  return (
    <>
      {filteredNotes.length === 0 ? (
        <h2 className="NoNs">No Notes Found</h2>
      ) : (
        <ul className="NotesUl">
          {filteredNotes.map((ele) => (
            <li className="lstNotes" key={ele.id}>
              <div className="fstline">
                <h3>{ele.heading}</h3>
                <button onClick={() => getID(ele.id)}>
                  <FaTrashAlt />
                </button>
              </div>
              <hr />
              <p>{ele.value}</p>
            </li>
          ))}
        </ul>
      )}
      <Dltconfrm dlt={dlt} eID={dltID} delt={delt} setdlt={setdlt} />
    </>
  );
};

export default TheNotes;
