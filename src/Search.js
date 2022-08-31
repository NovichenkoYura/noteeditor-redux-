import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { searchTitleInfo } from "./store/noteSlice";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

export const Search = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchedTitle, setSearschedTitle] = useState("");

  let notes = useSelector((state) => state.notes.notes);
 


  const dispatch = useDispatch();

 

  // const filterSearchTask = (searchedTitle, notes) => {
  //   if (!searchedTitle) {
  //     return notes;
  //   }
  //   return notes.filter(({ title }) =>
  //     title.toLowercase().includes(searchedTitle.toLowercase())
  //   );
  // };




  // useEffect(() => {
  //   const Debounce = setTimeout(() => {
  //     const filteredTitles = filterSearchTask(searchedTitle, notes);
  //     setSearschedTitle(filteredTitles);
  //   }, 3000);
  //   return () => clearTimeout(Debounce);
  // }, [searchedTitle, notes]);

  const formik = useFormik({
    initialValues: {
      searchedtitle: "",      
    },   
    
  });

   useEffect(() => {
    if (formik.values.search.length > 0) {
      dispatch(searchTitleInfo(formik.values.search))  
    } else {
       dispatch(searchTitleInfo(''))
    }
      
    
  },[formik.values.search])


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
