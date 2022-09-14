import { delNotesThunk, onCurrentItemInfo, getNotesThunk } from "./store/noteSlice";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export const SidebarRenderList = () => {

  const {     
    searchedNotesTitle,
    notesList,
  } = useSelector((state) => state.notes);

  const notes = notesList.filter((note) =>
    note.title.includes(searchedNotesTitle)
  );

  const [activeNote, setActiveNote] = useState(false);
  const dispatch = useDispatch();
  const edititemOnClick = (id) => dispatch(onCurrentItemInfo(id));
  const DeleteOnNote = (id) => dispatch(delNotesThunk(id));

   useEffect(() => {
    dispatch(getNotesThunk());
  }, [dispatch]);
  
  return (
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
  );
};
