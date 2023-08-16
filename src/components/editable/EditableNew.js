import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import edit from "./editable.module.css";

const EditableNew = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setinputDescription] = useState("");
  const [inputdeadLine, setnputdeadLine] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "" || inputDescription.trim() === "" || inputdeadLine.trim() === "") {
      alert("Please enter some text.");
      return;
    }
    if (props.onSubmit) {
      props.onSubmit(inputValue);
    }
    setShowEdit(false);
    setInputValue("");
    setinputDescription("");
    setnputdeadLine("");
  }

  return (
    <div className={edit.main_edit}>
      {showEdit ? (
        <form
          className={`${edit.input_edit} ${props.editClass || ""}`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={"Enter Name"}
          />
          <input
            autoFocus
            type="text"
            value={inputDescription}
            onChange={(e) => setinputDescription(e.target.value)}
            placeholder={"Enter Description"}
          />
           <input
            autoFocus
            type="text"
            value={inputdeadLine}
            onChange={(e) => setnputdeadLine(e.target.value)}
            placeholder={"Enter DeadLine"}
          />
          <div className={edit.edit_footer}>
            <button type="submit">{props.buttonText || "Add"}</button>
            <GrFormClose
              className={edit.svg}
              onClick={() => setShowEdit(false)}
            />
          </div>
        </form>
      ) : (
        <button
          className={`${edit.list}  ${props.listClass || ""}`}
          onClick={() => setShowEdit(true)}
        >
          <p className={edit.placeholder}>
            <span className={edit.addIcon}>
              <AiOutlinePlus />
            </span>
            {props.text || "Add task"}
          </p>
        </button>
      )}
    </div>
  );
};

export default EditableNew;
