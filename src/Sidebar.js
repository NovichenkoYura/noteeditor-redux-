import { useSelector, useDispatch } from "react-redux";
import { onDeleteNote, onCurrentItemInfo } from "./store/noteSlice";
import { useState } from "react";

export const Sidebar = () => {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [activeNote, setActiveNote] = useState(false);

  const addOnClick = () => {
    dispatch(onCurrentItemInfo(""));
  };

  const edititemOnClick = (id) => {
    dispatch(onCurrentItemInfo(id));
  };

  const DeleteOnNote = (id) => {
    dispatch(onDeleteNote(id));
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={addOnClick}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            onClick={() => edititemOnClick(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title !== "" && note.title}</strong>
              <button onClick={() => DeleteOnNote(note.id)}>Delete</button>
            </div>
            <p>{note.description !== "" && note.description}</p>

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
