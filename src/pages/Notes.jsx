import React, { useState, useEffect } from "react";
import AddNotes from "../components/Notes/AddNotes";
import ShwFrmbtn from "../components/Tasks/ShwFrmBtn";
import NsrchBar from "../components/Notes/NsrchBar";
import TheNotes from "../components/Notes/TheNotes";

const Notes = () => {
  const [item, setNewItem] = useState("");
  const [NewHead, setNewHead] = useState("");
  const [head, sethead] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [frm, setfrm] = useState(false);
  const [note, setNote] = useState(() => {
    const currentNote = localStorage.getItem("Notes");
    return currentNote ? JSON.parse(currentNote) : [];
  });

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(note));
  }, [note]);
  useEffect(() => {
    localStorage.setItem("Head", JSON.stringify(head));
  }, [head]);

  const addNewItem = (e) => {
    e.preventDefault();
    if (item.trim() === "") return;

    setNote([
      ...note,
      {
        id: Date.now(),
        heading: head,
        value: item,
        completed: false,
      },
    ]);

    setNewItem("");
    sethead("");
    setfrm(false);
  };
  const filteredNotes = note.filter((ele) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();

    const headsrch = ele.heading?.toLowerCase().includes(query);
    const subjectsrch = ele.value?.toLowerCase().includes(query);

    return headsrch || subjectsrch;
  });

  const dlt = (id) => setNote(note.filter((ele) => ele.id !== id));
  return (
    <>
      <AddNotes
        addNewItem={addNewItem}
        frm={frm}
        item={item}
        setNewItem={setNewItem}
        head={head}
        sethead={sethead}
      />
      <ShwFrmbtn setfrm={setfrm} frm={frm} />
      <NsrchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1>Notes :</h1>
      <TheNotes filteredNotes={filteredNotes} dlt={dlt} />
    </>
  );
};

export default Notes;
