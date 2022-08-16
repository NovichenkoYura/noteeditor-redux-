import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    value: "",
    currentEditingItem: [],
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

    onDeleteNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    onCurrentItemInfo(state, action) {
      state.currentEditingItem = action.payload;
    },

    onReplaceEditNote(state, action) {},
  },
});

export const { onAddNote, onDeleteNote, onCurrentItemInfo, onReplaceEditNote } =
  noteSlice.actions;
export default noteSlice.reducer;
