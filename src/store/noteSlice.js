import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import preloader from "../img/preloader.gif"

export const getNotesThunk = createAsyncThunk('note/getNotes',
  async () => {
    const response = await axios.get('http://localhost:3001/notes');
    const data = await response.data;        
    return (data);
  });

export const delNotesThunk = createAsyncThunk('note/delNotes', async (id) => {
   const response = await axios.delete(`http://localhost:3001/notes/${id}`, {      
   });    
    return id
  });
 
export const addNotesThunk = createAsyncThunk('note/addNotes', async ({ id, title, description, lastModified }) => {
  const note = {
    id: id,
    title: title,
    description: description,
    lastModified: lastModified
  };
  const response = await axios.post('http://localhost:3001/notes/', note); 
  const data = await response.data;   
  return data;    
  }); 

  export const updNotesThunk = createAsyncThunk('note/updNotes', async ({ id, title, description, lastModified }) => {
    const note = {
      id: id,
      title: title,
      description: description,
      lastModified: lastModified
    }    
    const response = await axios.patch(`http://localhost:3001/notes/${note.id}`, note);    
    const data = await response.data
    return data
  });


const noteSlice = createSlice({
  name: "note",
  initialState: {
    notesList: [],
    value: "",
    currentEditingItem: "",
    filterTitleStatus: true,
    filteDataStatus: true,
    searchedNotesTitle: [],
    isFetching: false,
  },

  extraReducers: (builder) => {
  builder.addCase(getNotesThunk.pending, (state) => { 
      state.isFetching = true
    });
  builder.addCase(getNotesThunk.fulfilled, (state, action) => { 
    state.notesList = action.payload
    state.isFetching = false
  });
  builder.addCase(addNotesThunk.pending, (state) => {
    state.isFetching = true
  });
  builder.addCase(addNotesThunk.fulfilled, (state, action) => {
    state.notesList.push(action.payload)
    state.isFetching = false
  });
  builder.addCase(delNotesThunk.pending, (state) => {
    state.isFetching = true
  });
  builder.addCase(delNotesThunk.fulfilled, (state, action) => {
    state.notesList = state.notesList.filter(
      (note) => note.id !== action.payload
    );
    state.isFetching = false
  });
    
  builder.addCase(updNotesThunk.pending, (state) => {
  state.isFetching = true
  });

  builder.addCase(updNotesThunk.fulfilled, (state, action) => {
    state.notesList = state.notesList.map((item) =>
      item.id === action.payload.id ? action.payload : item
    );
    state.isFetching = false
    });
  },

  reducers: {    
    onCurrentItemInfo(state, action) {
      state.currentEditingItem = action.payload;
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
  onCurrentItemInfo,
  sortTitle,
  sortDate,
  searchTitleInfo,
} = noteSlice.actions;
export default noteSlice.reducer;

