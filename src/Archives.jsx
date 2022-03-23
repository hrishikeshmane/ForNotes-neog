import "./Main.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import UnarchiveIcon from '@mui/icons-material/Unarchive';import DeleteIcon from '@mui/icons-material/Delete';
import nextId from "react-id-generator";

function Archives({ view, setView }) {
  let notesListDoc = doc(db, 
    "Notes", sessionStorage.getItem("email"));
  const [valueNotes, loadingNotes, errorNotes] = useDocument(notesListDoc, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  let notes = valueNotes?.data()?.archiveList ?? [];

  async function archiveNote(note){
    await updateDoc(notesListDoc, {archiveList: arrayRemove(note)})
    await updateDoc(notesListDoc, {notesList: arrayUnion(note)})
  }

  async function deleteNote(note){
    await updateDoc(notesListDoc, {archiveList: arrayRemove(note)})
  }

  return (
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
                className={view === "list" ? "note list-note" : "note"}
              >
                <h4>{eachNote.title}</h4>
                {eachNote.note.split("\n").map((sentence) => (
                  <p key={nextId("text-id-")}> {sentence} </p>
                ))}
                <div className="note-actions">
                  <button onClick={() => archiveNote(eachNote)}>
                    <UnarchiveIcon />
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
  );
}

export default Archives;
