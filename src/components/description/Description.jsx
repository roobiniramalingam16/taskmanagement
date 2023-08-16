import React, { useEffect, useRef, useState } from "react";
import style from "./Description.module.css";
import Icons from "../../components/icons/Icons";
import { BsJustifyLeft } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import { ListData } from "../../recoil/atom";

function Description({ boardId, cardId, cardDescription }) {
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [savedInput, setSavedInput] = useState("");
  const inputRef = useRef();
  // console.log(savedInput);
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEdit() {
    setEditing(true);
    // setInput(savedInput);
  }

  useEffect(() => {
    const savedInput = localStorage.getItem("input");
    if (savedInput) {
      setInput(savedInput);
      setSavedInput(savedInput);
    }
  }, []);

  function handleSave() {
    const unformattedText = input.replace(/(<([^>]+)>)/gi, "");
    // console.log(unformattedText);

    // console.log(boardId, "board");
    let previous = [...globalListData];
    // console.log(previous);
    let curtBoard = previous.map((list, ind) => {
      // console.log(curtBoard);
      if (list.id === boardId) {
        // console.log(curtBoard,"current");
        // console.log(boardId);
        const updatedCards = list.cards.map((card, cardIndex) => {
          if (card.cardID === cardId) {
            // console.log(card.cardID, "this is the main id");
            return { ...card, discription: unformattedText };
          }
          return card;
        });
        return { ...list, cards: updatedCards };
      }

      return list;
    });

    // console.log(curtBoard);
    setGlobalListData(curtBoard);
    localStorage.setItem("board", JSON.stringify(curtBoard));
    localStorage.setItem("input", unformattedText);
    setSavedInput(unformattedText);
    setEditing(false);
  }

  function handleCancel() {
    // setInput(savedInput);
    setEditing(false);
  }

  return (
    <div className={style.main}>
      <span className={style.justifyIcon}>
        <Icons icon={<BsJustifyLeft />} />
      </span>
      <div className={style.disc}>
        <div className={style.descriptionHeader}>
          <p>
            Description <AiOutlineInfoCircle className={style.infoIcon} />
          </p>
        </div>
        {editing ? (
          <div className={style.inputs} ref={inputRef}>
            <ReactQuill
              style={{ width: "26rem", marginTop: "1rem", backgroundColor: "white" }}
              // value={cardDescription}
              onChange={setInput}
            />
            <div className={style.buttonsSave}>
              <button onClick={handleSave} className={style.save}>
                Save
              </button>
              <button onClick={handleCancel} className={style.cancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              onClick={handleEdit}
              className={style.savedInput}
              dangerouslySetInnerHTML={{ __html: cardDescription }}
            />
            {!cardDescription && (
              <button onClick={() => setEditing(true)} className={style.button}>
                Add a more detailed description...
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Description;
