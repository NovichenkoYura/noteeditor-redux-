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

    filterTitle(state, action) {
      function SortArray(x, y) {
        return x.title.localeCompare(y.title);
      }
      console.log(state.notes.sort(SortArray));
      state.notes = state.notes.sort(SortArray);
      // const obj = action.payload;
      // console.log(obj.sort((a, b) => a.title - b.title));

      // const a = action.payload.sort((a, b) => a.title - b.title);

      // console.log(a);
      // const SortArray = (x, y) => {
      //   return x.localCompare(y);
      // };

      // const a = action.payload.map((item) => item.title.sort(SortArray));
      // console.log(a);

      // const a = action.payload.map((item) =>
      //   item.sort((a, b) => a.item.title.localCompare(b.item.title))
      // );
      // console.log(a);

      // const b = action.payload.map((item) => item.title);
      // // console.log(b);
      // const c = b.sort(SortArray);
      // // console.log(c);

      // const s = action.payload.sort(SortArray);
      // console.log(s);
      // state.notes = action.payload.map((item) => item.title.sort());
      // state.notes = action.payload.map((item) =>
      //   item.title.sort((a, b) => a.title.localCompare(b.title))
      // );
      // state.notes = action.payload.sort((a, b) =>
      //   a.title.localCompare(b.title)
      // );
    },
  },
});

export const {
  onAddNote,
  onDeleteNote,
  onCurrentItemInfo,
  onReplaceEditNote,
  filterTitle,
  searchTitleInfo,
} = noteSlice.actions;
export default noteSlice.reducer;
