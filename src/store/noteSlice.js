import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// export const getNotes = createAsyncThunk('note/getNotes', async ({ id, title, description, lastModified }) => {
//   const response = await fetch (GET  localhost:3000/posts/1, {id: id, title: title, description: description, lastModified: lastModified})
// })

// const showValue = () => {
//   console.log(inputQueryKey.value)
//   console.log(inputQueryValue.value)
//   fetch(`https://jsonplaceholder.typicode.com/comments?${inputQueryKey.value}=${inputQueryValue.value}`)
//   .then(response => response.json())
//   .then(json => {
//     console.log(json)
//       content.innerHTML =`
//       <p>name: ${json[0].name}</p>
//       <p>id: ${json[0].id}</p>
//       <p>email: ${json[0].email}</p>
//       <p>body: ${json[0].body}</p>
//     `
//   })
// }

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notesList: [],
    value: "",
    currentEditingItem: "",
    filterTitleStatus: true,
    filteDataStatus: true,
    searchedNotesTitle: [],
  },

  reducers: {
    onAddNote(state, action) {
      state.notesList.push({
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        lastModified: Date.now(),
      });
    },

    onDeleteNote(state, action) {
      state.notesList = state.notesList.filter(
        (note) => note.id !== action.payload
      );
    },

    onCurrentItemInfo(state, action) {
      state.currentEditingItem = action.payload;
    },

    onReplaceEditNote(state, action) {
      state.notesList = state.notesList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    searchTitleInfo(state, action) {
      state.searchedNotesTitle = action.payload;
    },

    sortTitle(state) {
      if (state.filterTitleStatus)
        state.notesList = state.notesList.sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
      else
        state.notesList = state.notesList.sort((a, b) =>
          b.title > a.title ? 1 : -1
        );
      state.filterTitleStatus = !state.filterTitleStatus;
    },

    sortDate(state) {
      if (state.filteDataStatus)
        state.notesList = state.notesList.sort((a, b) =>
          a.lastModified > b.lastModified ? 1 : -1
        );
      else
        state.notesList = state.notesList.sort((a, b) =>
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
  sortTitle,
  sortDate,
  searchTitleInfo,
} = noteSlice.actions;
export default noteSlice.reducer;
