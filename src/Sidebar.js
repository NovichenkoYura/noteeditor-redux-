import { useSelector, useDispatch } from "react-redux";
import { onCurrentItemInfo, sortTitle, sortDate } from "./store/noteSlice";
import { SidebarRenderList } from "./SidebarRenderList";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {
  const { filterTitleStatus, filterDataStatus, searchedNotesTitle, notesList } =
    useSelector((state) => state.notes);

  const notes = notesList.filter((note) =>
    note.title.includes(searchedNotesTitle)
  );

  const dispatch = useDispatch();
  const addOnClick = () => dispatch(onCurrentItemInfo(""));
  const onFilterTitle = () => dispatch(sortTitle());
  const onFilterDate = () => dispatch(sortDate());

  return (
    <div className="app-sidebar">
      <div className="sidebar-filter">
        <button
          className="sidebar-filter-btn"
          onClick={() => onFilterTitle(notes, !filterTitleStatus)}
        >
          Title
          {filterTitleStatus ? (
            <FontAwesomeIcon icon={faArrowDownShortWide} />
          ) : (
            <FontAwesomeIcon icon={faArrowUpWideShort} />
          )}
        </button>
        <button onClick={() => onFilterDate(notes, !filterDataStatus)}>
          Date
          {filterDataStatus ? (
            <FontAwesomeIcon icon={faArrowUpWideShort} />
          ) : (
            <FontAwesomeIcon icon={faArrowDownShortWide} />
          )}
        </button>
      </div>

      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={addOnClick}>New</button>
      </div>
      <SidebarRenderList />
    </div>
  );
};
