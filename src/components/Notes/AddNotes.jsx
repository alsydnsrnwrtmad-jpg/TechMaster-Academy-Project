import React from "react";
import "./AddNotes.css";

const AddNotes = ({ addNewItem, frm, item, setNewItem, head, sethead }) => {
  return (
    <div className={`add-form ${frm ? "active" : ""}`}>
      <form onSubmit={addNewItem}>
        <div>
          <label htmlFor="txthd">Note Title</label>
          <input
            type="text"
            id="txthd"
            value={head}
            onChange={(e) => sethead(e.target.value)}
            autoComplete="off"
            autoFocus
            required
          />
        </div>

        <div>
          <label htmlFor="txtinp">Note Subject</label>
          <textarea
            id="txtinp"
            value={item}
            onChange={(e) => setNewItem(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddNotes;