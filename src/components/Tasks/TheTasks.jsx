import React, { useState } from "react";
import Dltconfrm from "./dltconfrm";
import "./TheTasks.css";

const TheTasks = ({ filteredTasks, chkd, dlt, fltr }) => {
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
              <input
                type="checkbox"
                id={`CBinp-${ele.id}`}
                checked={ele.completed}
                onChange={() => chkd(ele.id)}
              />
              <label htmlFor={`CBinp-${ele.id}`}>
                <span>{ele.value}</span>
              </label>
              <span className={`prio ${ele.priority}`}>{ele.priority}</span>
              <button onClick={() => getID(ele.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Dltconfrm dlt={dlt} eID={dltID} delt={delt} setdlt={setdlt} />
      {console.log(dltID)}
    </>
  );
};

export default TheTasks;
