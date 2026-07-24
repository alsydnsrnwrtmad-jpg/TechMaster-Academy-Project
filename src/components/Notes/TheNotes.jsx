import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Dltconfrm from "../Tasks/Dltconfrm";
import "./TheNotes.css";

const TheNotes = ({ filteredNotes, dlt, onEdit }) => {
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

                <div className="actions">
                  <button onClick={() => onEdit(ele)} title="Edit Note" className="Ebtn">
                    <FaEdit />
                  </button>
                  <button onClick={() => getID(ele.id)} title="Delete Note" className="Dbtn">
                    <FaTrashAlt />
                  </button>
                </div>
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
