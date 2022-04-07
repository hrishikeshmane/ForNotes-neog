import { Chip } from "@mui/material";
import { useState } from "react";
import nextId from "react-id-generator";
import "./InputBox.css";

const InputBox = ({ notes, addNote, deleteNote }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [noteColor, setNoteColor] = useState("default");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const saveNote = (e) => {
    addNote({
      id: nextId(),
      title: title,
      note: note,
      date: new Date(),
      tags: tags,
      noteColor: noteColor,
    });
    setTitle("");
    setNote("");
    setTags([]);
    setNoteColor("default");
  };

  const handleTags = (e) => {
    e.preventDefault();
    let tag = e.target[0].value;
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    e.target[0].value = "";
  };

  const removeTag = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  const handleNoteColor = (color) => {
    setNoteColor(color);
  };

  return (
    <div className={`input-container ${noteColor}`}>
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
        <div className="color-box">
          <button
            className={`color-select red ${
              noteColor === "red" && "color-selected"
            }`}
            onClick={() => handleNoteColor("red")}
          ></button>
          <button
            className={`color-select yellow ${
              noteColor === "yellow" && "color-selected"
            }`}
            onClick={() => handleNoteColor("yellow")}
          ></button>
        </div>
        <form className="form-tags" onSubmit={handleTags}>
          <input type="text" placeholder="Tags"></input>
        </form>
        <div className="tags-box">
          {tags.map((tag) => (
            <Chip
              variant="outlined"
              sx={{ m: 0.3, color: "whitesmoke" }}
              key={tag}
              label={tag}
              onDelete={() => removeTag(tag)}
            />
          ))}
        </div>
        <button className="save-btn" onClick={saveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
export default InputBox;
