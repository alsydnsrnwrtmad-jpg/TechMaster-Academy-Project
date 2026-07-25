import React, { useState, useEffect } from "react";
import "./EditNotes.css";

const EditNotes = ({ isOpen, onClose, currentItem, onSave }) => {
  const [head, setHead] = useState("");
  const [val, setVal] = useState("");

  useEffect(() => {
    if (currentItem) {
      setHead(currentItem.heading || currentItem.title || "");
      setVal(currentItem.value || currentItem.task || "");
    }
  }, [currentItem]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...currentItem,
      heading: head,
      title: head, 
      value: val,
      task: val,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Note Title</label>
            <input
              type="text"
              value={head}
              onChange={(e) => setHead(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Note Subject</label>
            <textarea
              value={val}
              onChange={(e) => setVal(e.target.value)}
              rows="5"
              required
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;