import { onEditField, onAddNote } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const Main = ({ activeNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="app-main">
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
      </div>
    </div>
  );
};
