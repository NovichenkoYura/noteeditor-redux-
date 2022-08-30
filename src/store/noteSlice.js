import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    value: "",
    currentEditingItem: "",
    filterTitleStatus: true,
    filteDataStatus: true,
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

      state.notes = state.notes.map(item => item.id === action.payload.id ? action.payload : item)

    },

    searchTitleInfo(state, action) {
      state.notes = state.notes.filter((note) =>
        note.title.includes(action.payload.title)
      );
    },

    filterTitle(state) {
      if (state.filterTitleStatus === true) {
        state.notes = state.notes.sort((a, b) => (a.title > b.title ? 1 : -1));
      } else
        state.notes = state.notes.sort((a, b) => (b.title > a.title ? 1 : -1));
      state.filterTitleStatus = !state.filterTitleStatus;
    },

    filterDate(state) {
      if (state.filteDataStatus === true) {
        state.notes = state.notes.sort((a, b) =>
          a.lastModified > b.lastModified ? 1 : -1
        );
      } else
        state.notes = state.notes.sort((a, b) =>
          b.lastModified > a.lastModified ? 1 : -1
        );
      state.filteDataStatus = !state.filteDataStatus;
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
