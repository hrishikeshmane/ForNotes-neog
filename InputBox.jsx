import { useState } from "react";
import nextId from "react-id-generator";
import "./InputBox.css";

const InputBox = ({ notes, addNote, deleteNote }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const saveNote = (e) => {
    addNote({ id: nextId(), title: title, note: note });
    setTitle("");
    setNote("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={handleTitle}
      />
      <textarea
        type="text"
        value={note}
        placeholder="Take a note..."
        onChange={handleNote}
      />
      <div className="input-action-container">
        <button onClick={saveNote}>Save</button>
      </div>
    </div>
  );
};
export default InputBox;
