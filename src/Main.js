import { onAddNote } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const activeEditNote = useSelector((state) => state.notes.currentEditingItem);
  console.log(activeEditNote.title, activeEditNote.description);
  const dispatch = useDispatch();

  const onSaveBtnClick = () => {
    dispatch(onAddNote({ title: title, description: description }));
    setDescription("");
    setTitle("");
  };

  // if (activeEditNote !== []) {
  //   setTitle(activeEditNote.title);
  //   setDescription(activeEditNote.description);
  // }

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
        <button onClick={onSaveBtnClick}>Save</button>
      </div>
    </div>
  );
};
