import React from "react";
import "./Addfrm.css";

const AddFrm = ({
  addNewItem,
  frm,
  item,
  setNewItem,
  prio,
  setprio,
}) => {
  return (
    <div className={`add-form ${frm ? "active" : ""}`}>
      <form onSubmit={addNewItem}>
        <label htmlFor="txtinp">add task</label>
        <input
          type="text"
          id="txtinp"
          value={item}
          onChange={(e) => setNewItem(e.target.value)}
          autoComplete="off"
          autoFocus
          required
        />
        <div className="input-group">
          <label htmlFor="priority">Choose Task Priority :</label>
          <select
            id="priority"
            className="custom-select"
            required
            value={prio}
            onChange={(e) => setprio(e.target.value)}
          >
            <option value="" disabled>
              --Select an option--
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddFrm;
