import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";

import { onAddNote, onReplaceEditNote } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect} from "react";

export const Main = () => {
  
  const activeEditNoteId = useSelector(
    (state) => state.notes.currentEditingItem
  );

  const notes = useSelector((state) => state.notes.notes);

  const activeNote = notes.find((note) => note.id === activeEditNoteId);

  const dispatch = useDispatch();


  let Schema = Yup.object().shape({
    search: Yup.string().required("Required"),
    title: Yup.string().min(5).max(100).required("Required"),
    description: Yup.string().min(5).max(500).required("Required"),
  });

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
      if (activeNote) {
        dispatch(
          onReplaceEditNote({
            title: values.title,
            description: values.description,
            id: activeNote.id,
          })          
        );
        formik.values.title = "";
        formik.values.description = "";
        
      } else {
        dispatch(
          onAddNote({ title: values.title, description: values.description })
        );
        formik.values.title = "";
        formik.values.description = "";
      }
     
    },
    // validationSchema,
  });

useEffect(() => {
    if (activeNote) {      
        formik.setValues({
          title: activeNote.title,
          description: activeNote.description,
        })      
      }   
  }, [activeNote])


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="formik-form">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="formik-input"
        />
        <p className="formik-errors-message">{formik.errors.title}</p>
      </div>

      <div className="formik-form">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          type="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <p className="formik-errors-message">{formik.errors.description}</p>
      </div>

      <button
        type="submit"
        onClick={activeEditNoteId ? onReplaceEditNote : onAddNote}
        className="main__button"
      >
        {activeEditNoteId ? "Update" : "Save"}
      </button>
    </form>

    
  );
};
