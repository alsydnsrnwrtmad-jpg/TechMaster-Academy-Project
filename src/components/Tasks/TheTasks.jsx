import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; 
import Dltconfrm from "./dltconfrm";
import "./TheTasks.css";

const TheTasks = ({ filteredTasks, chkd, dlt, fltr, onEdit }) => {
  const [delt, setdlt] = useState(false);
  const [dltID, setDltID] = useState("");

  const getID = (id) => {
    setDltID(id);
    setdlt(!delt);
  };

  return (
    <>
      {filteredTasks.length === 0 ? (
        <h2 className="NoTs">No Tasks Found</h2>
      ) : (
        <ul>
          {filteredTasks.map((ele) => (
            <li className="lstTasks" key={ele.id}>
              <div className="task-content">
                <input
                  type="checkbox"
                  id={`CBinp-${ele.id}`}
                  checked={ele.completed}
                  onChange={() => chkd(ele.id)}
                />
                <label htmlFor={`CBinp-${ele.id}`}>
                  <span>{ele.value}</span>
                </label>
              </div>

              <span className={`prio ${ele.priority}`}>{ele.priority}</span>

        
              <div className="actions">
                <button 
                  className="edit-btn" 
                  onClick={() => onEdit(ele)} 
                  title="Edit Task"
                >
                  <FaEdit />
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => getID(ele.id)} 
                  title="Delete Task"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Dltconfrm dlt={dlt} eID={dltID} delt={delt} setdlt={setdlt} />
    </>
  );
};

export default TheTasks;