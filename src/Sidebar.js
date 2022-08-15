import { useSelector, useDispatch } from "react-redux";
import { onAddNote, onDeleteNote, onCurrentItemInfo } from "./store/noteSlice";
import { useState } from "react";

export const Sidebar = () => {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [activeNote, setActiveNote] = useState(false);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={() => dispatch(onAddNote())}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map((note) => (
          <div
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            onClick={() =>
              dispatch(
                onCurrentItemInfo({
                  id: note.id,
                  title: note.title,
                  description: note.description,
                })
              )
            }
          >
            <div className="sidebar-note-title">
              <strong>{note.title && note.title.substr(0, 120) + "..."}</strong>
              <button onClick={() => dispatch(onDeleteNote(note.id))}>
                Delete
              </button>
            </div>
            <p>{note.description && note.description.substr(0, 500) + "..."}</p>

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
