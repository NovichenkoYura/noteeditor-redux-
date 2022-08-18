import { onAddNote, onReplaceEditNote } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const activeEditNoteId = useSelector(
    (state) => state.notes.currentEditingItem
  );
  const notes = useSelector((state) => state.notes.notes);

  const activeNote = notes.find((note) => note.id === activeEditNoteId);

  const dispatch = useDispatch();

  const onSaveBtnClick = () => {
    dispatch(onAddNote({ title: title, description: description }));
    setDescription("");
    setTitle("");
  };

  const onEditBtnClick = () => {
    dispatch(
      onReplaceEditNote({
        title: title,
        description: description,
        id: activeNote.id,
      })
    );
    setDescription("");
    setTitle("");
  };
  useEffect(() => {
    if (activeEditNoteId && activeNote) {
      setTitle(activeNote.title);
      setDescription(activeNote.description);
      //  activeNote.title && setTitle(activeNote.title);
      //  activeNote.description && setDescription(activeNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [activeEditNoteId, activeNote]);

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
        <button onClick={activeEditNoteId ? onEditBtnClick : onSaveBtnClick}>
          {activeEditNoteId ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};
