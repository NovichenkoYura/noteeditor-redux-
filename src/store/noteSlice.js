import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    value: "",
  },
  reducers: {
    onAddNote(state, action) {
      state.notes.push({
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        lastModified: Date.now(),
      });
    },
    onUpdateNote(state, action) {},
    onDeleteNote(state, action) {},
    getActiveNote(state, action) {
      state.value = action.payload;
      console.log(action);
    },
    onEditField(state, action) {
      state.value = action.payload;
    },
  },
});

export const {
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  getActiveNote,
  onEditField,
} = noteSlice.actions;
export default noteSlice.reducer;
