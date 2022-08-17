import { onAddNote, onReplaceEditNote } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const activeEditNote = useSelector((state) => state.notes.currentEditingItem);
  const notes = useSelector((state) => state.notes.notes);

  const activeNotes = notes.find((note) => note.id === activeEditNote.id);
  console.log(activeNotes);
  console.log(activeNotes.title);
  console.log(activeNotes.description);

  const dispatch = useDispatch();

  const onSaveBtnClick = () => {
    dispatch(onAddNote({ title: title, description: description }));
    setDescription("");
    setTitle("");
  };

  // const onUpdtBtnClick = () => {
  //   dispatch(
  //     onReplaceEditNote({
  //       title: title,
  //       description: description,
  //       id: activeEditNote.id,
  //     })
  //   );
  //   setDescription("");
  //   setTitle("");
  // };

  useEffect(() => {
    setTitle(activeNotes.title);
    setDescription(activeNotes.description);
  }, [activeNotes]);

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
