import React, { useEffect, useState } from "react";
import "./Tasks.css";
import ShwFrmbtn from "../components/Tasks/ShwFrmBtn";
import AddFrm from "../components/Tasks/AddFrm";
import SrchBar from "../components/Tasks/SrchBar";
import TheTasks from "../components/Tasks/TheTasks";
const Tasks = () => {
  const [item, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [frm, setfrm] = useState(false);
  const [prio, setprio] = useState("");
  const [task, setTask] = useState(() => {
    const currentTask = localStorage.getItem("TASKS");
    return currentTask ? JSON.parse(currentTask) : [];
  });
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(task));
  }, [task]);
  const addNewItem = (e) => {
    e.preventDefault();
    if (item.trim() === "") {
      return;
    }
    setTask([
      ...task,
      {
        id: Date.now(),
        value: item,
        completed: false,
        priority: prio,
      },
    ]);
    setNewItem("");
    setfrm(!frm);
    setprio("");
  };
  const filteredTasks = task.filter((ele) =>
    ele.value.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const chkd = (id) => {
    setTask(
      task.map((ele) => {
        if (ele.id === id) {
          return { ...ele, completed: !ele.completed };
        }
        return ele;
      }),
    );
  };
  const dlt = (id) => {
    setTask(task.filter((ele) => ele.id !== id));
  };
  const pirori = (e) => {
    setprio(e);
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
        pirori={pirori}
      />
      <SrchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 style={{ marginTop: "15px" }}>Tasks :</h1>
      <TheTasks
        filteredTasks={filteredTasks}
        dlt={dlt}
        chkd={chkd}
        prio={prio}
      />
    </>
  );
};
export default Tasks;
