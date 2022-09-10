import "./App.css";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";
import { Search } from "./Search";

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="app-main">
        <div className="app-main-note-edit">
          <Search />
          <Main />
        </div>
      </div>
    </div>
  );
};

export default App;
