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
      console.log(state);
      console.log(action);

      state.notes.push({
        id: uuidv4(),
        title: action.payload.title,
        body: action.payload.body,
        lastModified: Date.now(),
      });
    },
    onUpdateNote(state, action) {},
    onDeleteNote(state, action) {},
    getActiveNote(state, action) {},
    onEditField(state, action) {
      state.value = action.payload;
      // console.log(state);
      // console.log(action);
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
