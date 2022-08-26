import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    value: "",
    currentEditingItem: "",
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

    onReplaceEditNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      state.notes.push(action.payload);
    },

    searchTitleInfo(state, action) {
      // console.log(action.payload);
      state.notes = state.notes.filter((note) =>
        note.title.includes(action.payload.title)
      );
      // console.log(state.notes);
    },

    filterTitle(state) {
      // function SortArray(x, y) {
      //   return x.title.localeCompare(y.title);
      // }
      // console.log(state.notes.sort(SortArray));
      // state.notes = state.notes.sort(SortArray);
      state.notes = state.notes.sort((a, b) => a.title > b.title ? 1 : -1)
    },

    filterDate(state) {
      state.notes = state.notes.sort((a, b) => a.lastModified < b.lastModified ? 1 : -1)
    },
  },
});

export const {
  onAddNote,
  onDeleteNote,
  onCurrentItemInfo,
  onReplaceEditNote,
  filterTitle,
  filterDate,
  searchTitleInfo,
} = noteSlice.actions;
export default noteSlice.reducer;
