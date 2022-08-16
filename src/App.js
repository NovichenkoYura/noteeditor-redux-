import "./App.css";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";
import { useEffect, useState } from "react";
import { stringify, v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { onAddNote } from "./store/noteSlice";

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
