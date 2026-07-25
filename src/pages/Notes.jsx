import React, { useState, useEffect } from "react";
import AddNotes from "../components/Notes/AddNotes";
import ShwFrmbtn from "../components/Tasks/ShwFrmBtn";
import NsrchBar from "../components/Notes/NsrchBar";
import TheNotes from "../components/Notes/TheNotes";
import EditNotes from "../components/Notes/EditNotes";

const Notes = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [item, setNewItem] = useState("");
  const [head, sethead] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [frm, setfrm] = useState(false);
  const handleTogglePin = (id) => {
    setNote((prevNotes) =>
      prevNotes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  const [note, setNote] = useState(() => {
    const currentNote = localStorage.getItem("Notes");
    return currentNote ? JSON.parse(currentNote) : [];
  });

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(note));
  }, [note]);

  const handleSaveEdit = (updatedItem) => {
    setNote((prevNotes) =>
      prevNotes.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
  };

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
      <TheNotes
        filteredNotes={filteredNotes}
        dlt={dlt}
        onEdit={(item) => setEditingItem(item)}
        onTogglePin={handleTogglePin}
      />
      <EditNotes
        isOpen={Boolean(editingItem)}
        currentItem={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default Notes;
