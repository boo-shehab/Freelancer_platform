import React, { useState } from "react";
import styles from "./EditAboutPopup.module.css";
import ComntainerForm from "../ContainerForm/ContainerForm";

const EditAboutPopup = ({ isOpen, onClose, initialText, onSave }) => {
  const [text, setText] = useState(initialText || "");

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  const startingLength = 0;
  const currentLength = startingLength + text.length;

  if (!isOpen) return null ;

  return (
    <ComntainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit About">
        <div className={styles.popup}>
          {/* <div className={styles.header}>
            <h2>Edit About</h2>
            <button onClick={onClose} className={styles.closeButton}>
              X
            </button>
          </div> */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000 - startingLength}
            placeholder=""
            className={styles.textarea}
          ></textarea>
          <span>{currentLength}/2000</span>
          <div className={styles.footer}>
            <button onClick={handleSave} className={styles.saveButton}>
              Save
            </button>
          </div>
        </div>
    </ComntainerForm>
  );
};

export default EditAboutPopup;
