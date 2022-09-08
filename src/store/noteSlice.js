import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const getNotesThunk = createAsyncThunk('note/getNotes',
  async () => {
    const response = await fetch('http://localhost:3001/notes');
    const data = await response.json();    
    return (data);

  });

  export const delNotesThunk = createAsyncThunk('note/delNotes', async (id, {dispatch}) => {
    const response = await fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE'
    });
    console.log(response)
    dispatch(onDeleteNote({id}))
  });

// export const getNotesThunk = createAsyncThunk('note/getNotes', async ({ id, title, description, lastModified }) => {
//   const response = await fetch(........, { id: id, title: title, description: description, lastModified: lastModified });
//   .then(response.json);
// })

// export const getNotesThunk = createAsyncThunk('note/getNotes', async ({ id, title, description, lastModified }) => {
//   const response = await fetch(........, { id: id, title: title, description: description, lastModified: lastModified });
//   .then(response.json);
// })

// export const addNotesThunk = createAsyncThunk('note/addNotes', async ({ id, title, description, lastModified }) => {
//   const response = await fetch(........., { id: id, title: title, description: description, lastModified: lastModified });
//    return response.data;
// })

// export const delNotesThunk = createAsyncThunk('note/delNotes', async ({ id, title, description, lastModified }) => {
//   const response = await fetch(........., { id: id, title: title, description: description, lastModified: lastModified });
//    return response.data;
// })

// export const updNotesThunk = createAsyncThunk('note/updNotes', async ({ id, title, description, lastModified }) => {
//   const response = await fetch(........., { id: id, title: title, description: description, lastModified: lastModified });
//   return response.data;
// })



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

  

  extraReducers: (builder) => {
  builder.addCase(getNotesThunk.fulfilled, (state, action) => { 
      state.notesList = action.payload
    });
  //   builder.addCase(addNotesThunk.fulfilled, (state, action) => { });
  //   builder.addCase(delNotesThunk.fulfilled, (state, action) => { });
  //   builder.addCase(updNotesThunk.fulfilled, (state, action) => { });
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

