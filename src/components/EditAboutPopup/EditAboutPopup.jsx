import React, { useEffect, useState } from "react";
import styles from "./EditAboutPopup.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import fetchData from "../../utility/fetchData";
import useUserinfoStore from "../../useUserinfoStore";

const EditAboutPopup = ({ isOpen, onClose }) => {
  const { about, setAbout } = useUserinfoStore();
  const [aboutInput , setAboutInput] = useState("")

  const handleSave = async () => {
    try {
      await fetchData(`profiles/about`, {
        method: "PATCH",
        body: JSON.stringify({ about }),
      }, {
        'Content-Type': 'application/json'
      });
      setAbout(aboutInput)
      onClose();
    } catch (e) {
      console.error("Error updating about:", e);
    }
  };


  useEffect(()=>{
    setAboutInput(about)
  },[])

  const currentLength = aboutInput.length;


  if (!isOpen) return null;

  
  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit About">
      <div className={styles.popup}>
        <textarea
          value={aboutInput}
          onChange={(e) => setAboutInput(e.target.value)}
          maxLength={2000}
          placeholder="Write about yourself..."
          className={styles.textarea}
        ></textarea>
        <span>{currentLength}/2000</span>
        <div className={styles.footer}>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </ContainerForm>
  );
};

export default EditAboutPopup;
