import React, { useState, useEffect } from "react";
import "./EditTasks.css";

const EditTasks = ({ isOpen, onClose, currentItem, onSave }) => {
  const [taskValue, setTaskValue] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (currentItem) {
      setTaskValue(currentItem.value || currentItem.task || "");
      setPriority(currentItem.priority || "medium");
    }
  }, [currentItem]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskValue.trim()) return;

    onSave({
      ...currentItem,
      value: taskValue,
      task: taskValue,
      priority: priority,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Description</label>
            <input
              type="text"
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTasks;