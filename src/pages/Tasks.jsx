import React, { useEffect, useState } from "react";
import "./Tasks.css";
import ShwFrmbtn from "../components/Tasks/ShwFrmBtn";
import AddFrm from "../components/Tasks/AddFrm";
import SrchBar from "../components/Tasks/SrchBar";
import TheTasks from "../components/Tasks/TheTasks";
import EditTasks from "../components/Tasks/EditTasks";

const Tasks = () => {
  const [item, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [frm, setfrm] = useState(false);
  const [prio, setprio] = useState("");
  const [fltr, setfltr] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const [task, setTask] = useState(() => {
    const currentTask = localStorage.getItem("TASKS");
    return currentTask ? JSON.parse(currentTask) : [];
  });

  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(task));
  }, [task]);
  const totalTasks = task.length;
  const completedTasks = task.filter((t) => t.completed).length;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleSaveTaskEdit = (updatedTask) => {
    setTask((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };

  const addNewItem = (e) => {
    e.preventDefault();
    if (item.trim() === "") return;

    setTask([
      ...task,
      {
        id: Date.now(),
        value: item,
        completed: false,
        priority: prio || "medium",
      },
    ]);

    setNewItem("");
    setfrm(false);
    setprio("");
  };

  const filteredTasks = task.filter((ele) => {
    const matchesSearch = ele.value
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      fltr === "" || ele.priority?.toLowerCase() === fltr.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const chkd = (id) => {
    setTask(
      task.map((ele) =>
        ele.id === id ? { ...ele, completed: !ele.completed } : ele,
      ),
    );
  };

  const dlt = (id) => {
    setTask(task.filter((ele) => ele.id !== id));
  };

  return (
    <>
      <ShwFrmbtn frm={frm} setfrm={setfrm} />
      <AddFrm
        addNewItem={addNewItem}
        frm={frm}
        item={item}
        setNewItem={setNewItem}
        setprio={setprio}
        prio={prio}
      />
      <SrchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        prio={prio}
        setfltr={setfltr}
        fltr={fltr}
      />
      {totalTasks > 0 && (
        <div className="progress-container">
          <div className="progress-text">
            <span>Progress Status</span>
            <span>
              {completedTasks} of {totalTasks} completed ({progressPercent}%)
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      <h1>Tasks :</h1>
      <TheTasks
        filteredTasks={filteredTasks}
        dlt={dlt}
        chkd={chkd}
        prio={prio}
        fltr={fltr}
        onEdit={(taskItem) => setEditingTask(taskItem)}
      />
      <EditTasks
        isOpen={Boolean(editingTask)}
        currentItem={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveTaskEdit}
      />
    </>
  );
};

export default Tasks;
