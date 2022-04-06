import { useState } from "react";
import InputBox from "./InputBox";
import nextId from "react-id-generator";
import "./Main.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { applyFilter } from "./context/utils/filters";
import { useFilter } from "./context/FilterProvider";
import { Modal, Chip, Box } from "@mui/material/";

const Main = ({ view, setView }) => {
  let notesListDoc = doc(db, "Notes", sessionStorage.getItem("email"));
  const [valueNotes, loadingNotes, errorNotes] = useDocument(notesListDoc, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  let notes = valueNotes?.data()?.notesList ?? [];

  async function addNote(note) {
    await updateDoc(notesListDoc, { notesList: arrayUnion(note) });
  }

  async function archiveNote(note) {
    await updateDoc(notesListDoc, { notesList: arrayRemove(note) });
    await updateDoc(notesListDoc, { archiveList: arrayUnion(note) });
  }

  async function deleteNote(note) {
    await updateDoc(notesListDoc, { notesList: arrayRemove(note) });
  }

  const [prevNote, setPrevNote] = useState({});
  const [editNote, setEditNote] = useState({
    id: "",
    date: "",
    tags: [],
    note: "",
    title: "",
    noteColor: "",
  });

  const handleEditNote = (note) => {
    setPrevNote(note);
    setEditNote(note);
  };

  const handleCloseModal = () => {
    setEditNote({
      id: "",
      date: "",
      tags: [],
      note: "",
      title: "",
      noteColor: "",
    });
    setPrevNote({});
  };

  const handleTags = (e) => {
    e.preventDefault();
    let tag = e.target[0].value;
    if (!editNote.tags.includes(tag)) {
      setEditNote({ ...editNote, tags: [...editNote.tags, tag] });
    }
    e.target[0].value = "";
  };

  const removeTag = (tag) => {
    setEditNote({
      ...editNote,
      tags: editNote.tags.filter((item) => item !== tag),
    });
  };

  const saveEditedNote = () => {
    setEditNote({
      ...editNote,
      date: new Date(),
    });
    deleteNote(prevNote);
    addNote(editNote);

    handleCloseModal();
  };

  const { filterState } = useFilter();

  return (
    <main>
      <InputBox notes={notes} addNote={addNote} deleteNote={deleteNote} />
      <div className="wrapper">
        <ResponsiveMasonry
          columnsCountBreakPoints={
            view === "list" ? { 1600: 1 } : { 350: 1, 700: 2, 1000: 3, 1300: 4 }
          }
        >
          <Masonry>
            {applyFilter(notes, filterState).map((eachNote) => {
              return (
                <div
                  onClick={() => handleEditNote(eachNote)}
                  key={eachNote.id}
                  className={`note ${view === "list" && "list-note"} ${
                    eachNote.noteColor
                  }`}
                >
                  <h4>{eachNote.title}</h4>
                  {eachNote.note.split("\n").map((sentence) => (
                    <p key={nextId("text-id-")}> {sentence} </p>
                  ))}
                  <div className="tags-bar">
                    {eachNote.tags.map((tag) => (
                      <small key={nextId("tag-id")}>{tag}</small>
                    ))}
                  </div>
                  <div className="note-actions">
                    <button onClick={() => archiveNote(eachNote)}>
                      <ArchiveIcon />
                    </button>
                    <button onClick={() => deleteNote(eachNote)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      <Modal
        open={editNote.id === "" ? false : true}
        onClose={handleCloseModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#333333",
            border: "2px solid #000",
            boxShadow: 24,
            p: 3,
          }}
          className={`input-container ${editNote.noteColor}`}
        >
          <input
            type="text"
            value={editNote.title}
            placeholder="Title"
            onChange={(e) =>
              setEditNote({ ...editNote, title: e.target.value })
            }
          />
          <textarea
            type="text"
            value={editNote.note}
            placeholder="Take a note..."
            onChange={(e) => setEditNote({ ...editNote, note: e.target.value })}
          />
          <div className="input-action-container">
            <div className="color-box">
              <button
                className={`color-select red ${
                  editNote.noteColor === "red" && "color-selected"
                }`}
                onClick={() => setEditNote({ ...editNote, noteColor: "red" })}
              ></button>
              <button
                className={`color-select yellow ${
                  editNote.noteColor === "yellow" && "color-selected"
                }`}
                onClick={() =>
                  setEditNote({ ...editNote, noteColor: "yellow" })
                }
              ></button>
            </div>
            <form className="form-tags" onSubmit={handleTags}>
              <input type="text" placeholder="Tags"></input>
            </form>
            <div className="tags-box">
              {editNote.tags.map((tag) => (
                <Chip
                  variant="outlined"
                  sx={{ m: 0.3, color: "whitesmoke" }}
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                />
              ))}
            </div>
            <button className="save-btn" onClick={saveEditedNote}>
              Edit
            </button>
          </div>
        </Box>
      </Modal>
    </main>
  );
};

export default Main;
