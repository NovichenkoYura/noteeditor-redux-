import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export const Search = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchedTitle, setSearschedTitle] = useState("");

  const notes = useSelector((state) => state.notes.notes);

  const dispatch = useDispatch();

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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      //   dispatch(
      //     onAddNote({ title: values.title, description: values.description })
      //   );
      formik.values.title = "";
      formik.values.description = "";
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="formik-form">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        name="search"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.search}
      />
    </form>
  );
};
