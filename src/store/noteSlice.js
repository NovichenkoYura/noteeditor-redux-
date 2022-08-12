import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
  },
  reducers: {
    onAddNote(state, action) {
      console.log(state);
      console.log(action);

      state.notes.push({
        id: uuidv4(),
        title: "untitled note",
        body: "",
        lastModified: Date.now(),
      });
    },
    onUpdateNote(state, action) {},
    onDeleteNote(state, action) {},
    getActiveNote(state, action) {},
  },
});

export const { onAddNote, onUpdateNote, onDeleteNote, getActiveNote } =
  noteSlice.actions;
export default noteSlice.reducer;
