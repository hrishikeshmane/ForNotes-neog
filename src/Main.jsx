import InputBox from "./InputBox";
import nextId from "react-id-generator";
import "./Main.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

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
            {notes.reverse().map((eachNote) => {
              return (
                <div
                  key={eachNote.id}
                  className={`note ${view === "list" && "list-note"} ${
                    eachNote.noteColor
                  }`}
                >
                  <h4>{eachNote.title}</h4>
                  {eachNote.note.split("\n").map((sentence) => (
                    <p key={nextId("text-id-")}> {sentence} </p>
                  ))}
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
    </main>
  );
};

export default Main;
