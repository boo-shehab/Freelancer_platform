import React, { useState } from "react";
import styles from "./FreelancerTwoStageFormPopup.module.css";

const EditAboutPopup = ({ isOpen, onClose, initialText, onSave }) => {
  console.log("isOpen:", isOpen);
  console.log("initialText:", initialText);

  const [text, setText] = useState(initialText || "");

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  const startingLength = 0;
  const currentLength = startingLength + text.length;

  if (!isOpen) return null ;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Edit About</h2>
          <button onClick={onClose} className={styles.closeButton}>
            X
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000 - startingLength}
          placeholder=""
          className={styles.textarea}
        ></textarea>
        <div className={styles.footer}>
          <span>{currentLength}/2000</span>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAboutPopup;
