import { onEditField, onAddNote } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const Main = ({ activeNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  // console.log(useSelector((state) => state.notes));

  return (
    <div className="app-main">
      <button
        onClick={() =>
          dispatch(
            onAddNote({ title: title, description: description }),
            setDescription(""),
            setTitle("")
          )
        }
      >
        Save
      </button>
      <div className="app-main-note-edit">
        <input
          type="text"
          placeholder="Write your title here..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      {/* <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">{activeNote.body}</div>
      </div> */}
    </div>
  );
};
