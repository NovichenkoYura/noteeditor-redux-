import { useSelector, useDispatch } from "react-redux";
// import { onAddNote, activeNote, setActiveNote, onDeleteNote } from "./App";
import { onAddNote } from "./store/noteSlice";
export const Sidebar = () => {
  //   const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={() => dispatch(onAddNote())}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map((note) => (
          <div
          // className={`app-sidebar-note ${note.id === activeNote && "active"}`}
          // onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title && note.title.substr(0, 120) + "..."}</strong>
              {/* <button onClick={() => onDeleteNote(note.id)}>Delete</button> */}
            </div>
            <p>{note.body && note.body.substr(0, 500) + "..."}</p>
            <small className="note-meta">
              Last modified{" "}
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
