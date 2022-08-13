import "./App.css";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";
import { useEffect, useState } from "react";
import { stringify, v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { onAddNote } from "./store/noteSlice";

const App = () => {
  const [note, setNote] = useState([]);
  const dispatch = useDispatch();

  const addNote = () => dispatch(onAddNote(note));

  // const [activeNote, setActiveNote] = useState(false);

  // const onAddNote = () => {
  //   const newNote = {
  //     id: uuidv4(),
  //     title: "untitled note",
  //     body: "",
  //     lastModified: Date.now(),
  //   };
  //   // setNotes([newNote, ...notes]);
  // };

  const onUpdateNote = (onUpdateNote) => {
    // const undatedNotesArray = notes.map((note) => {
    //   if (note.id === activeNote) {
    //     return onUpdateNote;
    //   }
    //   return note;
    // });
    // setNotes(undatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    // setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    // return notes.find((note) => note.id === activeNote);
  };

  const onEditField = () => {};

  return (
    <div className="App">
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
