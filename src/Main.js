import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";

import { onAddNote, onReplaceEditNote, onCurrentItemInfo } from "./store/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect} from "react";

export const Main = () => {  

    const {     
    currentEditingItem,
    notesList,
  } = useSelector((state) => state.notes); 

  const activeNote = notesList.find((note) => note.id === currentEditingItem);

  const dispatch = useDispatch();

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
    onSubmit: (values, {resetForm}) => {
      if (activeNote) {
        dispatch(
          onReplaceEditNote({
            title: values.title,
            description: values.description,
            id: activeNote.id,
          })          
        );
        dispatch(onCurrentItemInfo(''))
              
      } else {
        dispatch(
          onAddNote({ title: values.title, description: values.description })
        );
        resetForm();
       
      }
     
    },
    validationSchema,
  });

  useEffect(() => {
    if (activeNote && currentEditingItem) {
      formik.setValues({
        title: activeNote.title,
        description: activeNote.description,
      });
    } else {
      formik.setValues({
        title: "",
        description: "",
      });
    }
  }, [activeNote, currentEditingItem]);


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
        onClick={currentEditingItem ? onReplaceEditNote : onAddNote}
        className="main__button"
      >
        {currentEditingItem ? "Update" : "Save"}
      </button>
    </form>

    
  );
};
