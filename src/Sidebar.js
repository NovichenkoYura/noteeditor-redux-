import { useSelector, useDispatch } from "react-redux";
import {
  onDeleteNote,
  onCurrentItemInfo,
  filterTitle,
  filterDate,
} from "./store/noteSlice";
import { useState } from "react";

export const Sidebar = () => {
  let filterTitleStatus = useSelector((state) => state.notes.filterTitleStatus);
  let filterDataStatus = useSelector((state) => state.notes.filteDataStatus);

  const initialNotes = useSelector((state) => state.notes.notes);
  const searchedNotesTitle = useSelector((state) => state.notes.searchedNotesTitle);  
  const notes = initialNotes.filter((note) => note.title.includes(searchedNotesTitle));

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

  const onFilterTitle = () => {
    dispatch(filterTitle());
  };

  const onFilterDate = () => {
    dispatch(filterDate());
  };

  return (
    <div className="app-sidebar">
      <div className="sidebar-filter">
        <button
          onClick={() => {
            onFilterTitle(notes, !filterTitleStatus);
          }}
        >
          Title
          <svg width="18" height="18">
            <use></use>
          </svg>
        </button>
        <button
          onClick={() => {
            onFilterDate(notes, !filterDataStatus);
          }}
        >
          Date
        </button>
      </div>

      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={addOnClick}>New</button>
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
