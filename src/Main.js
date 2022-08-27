import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";

import {
  onAddNote,
  onReplaceEditNote,
  searchTitleInfo,
} from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchedTitle, setSearschedTitle] = useState("");

  const activeEditNoteId = useSelector(
    (state) => state.notes.currentEditingItem
  );
  const notes = useSelector((state) => state.notes.notes);

  const activeNote = notes.find((note) => note.id === activeEditNoteId);

  const dispatch = useDispatch();

  const onSaveBtnClick = () => {
    if (title === "" || description === "") {
      alert("Please fill the field");
    } else {
      dispatch(onAddNote({ title: title, description: description }));
      setDescription("");
      setTitle("");
    }
  };

  const onEditBtnClick = () => {
    if (title === "" || description === "") {
      alert("Please fill the field");
    } else {
      dispatch(
        onReplaceEditNote({
          title: title,
          description: description,
          id: activeNote.id,
        })
      );
      setDescription("");
      setTitle("");
    }
  };

  const getTextariadescr = (e) => {
    setDescription(e.target.value);
  };

  const getInputdescr = (e) => {
    setTitle(e.target.value);
  };

  const searchTitle = () => {
    dispatch(searchTitleInfo({ title: searchedTitle }));
  };

  const onIputgetSearchInfo = (e) => {
    setSearschedTitle(e.target.value);
  };

  const filterSearchTask = (searchedTitle, notes) => {
    // if (!searchedTitle) {
    //   return notes;
    // }
    // return notes.filter(({ title }) =>
    //   title.toLowercase().includes(searchedTitle.toLowercase())
    // );
  };

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredTitles = filterSearchTask(searchedTitle, notes);
      setSearschedTitle(filteredTitles);
    }, 3000);
    return () => clearTimeout(Debounce);
  }, [searchedTitle, notes]);

  useEffect(() => {
    if (activeEditNoteId && activeNote) {
      setTitle(activeNote.title);
      setDescription(activeNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [activeEditNoteId, activeNote]);

  // let Schema = yup.object().shape({
  //   search: yup.string().required("Required"),
  //   title: yup.string().min(5).max(100).required("Required"),
  //   description: yup.string().min(5).max(500).required("Required"),
  // });

  const validationSchema = useMemo(() => {
    return Yup.object({
      title: Yup.string().min(5).max(100).required("Required"),
      description: Yup.string().min(5).max(500).required("Required"),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      dispatch(
        onAddNote({ title: values.title, desciption: values.description })
      );
    },
    // validationSchema,
  });

  console.log(formik.errors);

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {/* <div className="app-main__search">
          <input
            type="text"
            placeholder="Search"
            value={searchedTitle}
            onChange={onIputgetSearchInfo}
          />
          <button onClick={searchTitle} className="main-btn__search">
            Search
          </button>
        </div>
        <label className="main__title">Title</label>
        <input
          type="text"
          placeholder="Write your title here..."
          value={title}
          onChange={getInputdescr}
        />
        <label className="main__title">Description</label>
        <textarea
          id="body"
          placeholder="Write your note here..."
          type="text"
          value={description}
          onChange={getTextariadescr}
        />
        <button
          onClick={activeEditNoteId ? onEditBtnClick : onSaveBtnClick}
          className="main__button"
        >
          {activeEditNoteId ? "Update" : "Save"}
        </button> */}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            name="search"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.search}
          />
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            type="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <button
            type="submit"
            onClick={activeEditNoteId ? onEditBtnClick : onSaveBtnClick}
            className="main__button"
          >
            {activeEditNoteId ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};
