import React, { useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaThumbtack,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import Dltconfrm from "../Tasks/Dltconfrm";
import "./TheNotes.css";

const TheNotes = ({ filteredNotes, dlt, onEdit, onTogglePin }) => {
  const [delt, setdlt] = useState(false);
  const [dltID, setDltID] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const getID = (id) => {
    setDltID(id);
    setdlt(!delt);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0),
  );

  return (
    <>
      {sortedNotes.length === 0 ? (
        <h2 className="NoNs">No Notes Found</h2>
      ) : (
        <ul className="NotesUl">
          {sortedNotes.map((ele) => (
            <li
              className={`lstNotes ${ele.pinned ? "pinned" : ""}`}
              key={ele.id}
            >
              <div className="fstline">
                <h3>
                  {ele.pinned && <FaThumbtack className="pin-icon-active" />}{" "}
                  {ele.heading}
                </h3>

                <div className="actions">
                  <button
                    onClick={() => onTogglePin(ele.id)}
                    className={`PinCopyB ${ele.pinned ? "pinned-btn" : ""}`}
                    title={ele.pinned ? "Unpin Note" : "Pin Note"}
                  >
                    <FaThumbtack />
                  </button>

                  
                  <button
                    onClick={() =>
                      handleCopy(ele.id, `${ele.heading}\n${ele.value}`)
                    }
                    className="PinCopyB"
                    title="Copy Note"
                  >
                    {copiedId === ele.id ? (
                      <FaCheck color="#4ed1a0" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>

                 
                  <button
                    onClick={() => onEdit(ele)}
                    className="action-btn edit-btn"
                    title="Edit Note"
                  >
                    <FaEdit />
                  </button>

                 
                  <button
                    onClick={() => getID(ele.id)}
                    className="action-btn delete-btn"
                    title="Delete Note"
                  >
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
