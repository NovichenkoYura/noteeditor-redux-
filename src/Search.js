import { useFormik } from "formik";
import { searchTitleInfo } from "./store/noteSlice";

import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

export const Search = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      searchedtitle: "",
    },
  });

  useEffect(() => {
    if (formik.values.search) dispatch(searchTitleInfo(formik.values.search));
    else dispatch(searchTitleInfo(""));
  }, [formik.values.search]);

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
