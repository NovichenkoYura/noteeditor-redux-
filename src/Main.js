import { onEditField, onAddNote } from "./store/noteSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const Main = ({ activeNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  // const onEditField = (key, value) => {
  //   onUpdateNote({
  //     ...activeNote,
  //     [key]: value,
  //     lastModified: Date.now(),
  //   });
  // };

  // if (!activeNote)
  //   return <div className="no-active-note">No note selected</div>;

  return (
    <div className="app-main">
      <button
        onClick={() => dispatch(onAddNote({ title: title, desc: "sdfsdfsad" }))}
      >
        Save
      </button>
      <div className="app-main-note-edit">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus
        />
        {/* <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        /> */}
      </div>
      {/* <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">{activeNote.body}</div>
      </div> */}
    </div>
  );
};
