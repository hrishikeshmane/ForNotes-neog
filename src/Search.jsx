import "./Main.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import nextId from "react-id-generator";

function Search({ view, searchField }) {
  let notesListDoc = doc(db, "Notes", sessionStorage.getItem("email"));
  const [valueNotes, loadingNotes, errorNotes] = useDocument(notesListDoc, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  let dataNotes = valueNotes?.data()?.notesList ?? [];
  let archiveNotes = valueNotes?.data()?.archiveList ?? [];

  const notes = [...dataNotes, ...archiveNotes];

  const searchNotes =
    searchField !== null
      ? notes.filter((eachNote) =>
          eachNote.note.toLowerCase().includes(searchField.toLowerCase())
        )
      : notes;

  return (
    <div className="wrapper">
      <ResponsiveMasonry
        columnsCountBreakPoints={
          view === "list" ? { 1600: 1 } : { 350: 1, 700: 2, 1000: 3, 1300: 4 }
        }
      >
        <Masonry>
          {searchNotes.reverse().map((eachNote) => {
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
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Search;
