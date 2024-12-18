import React, { useState } from "react";
import styles from "./EditProfilePopup.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import FetchData from "../../utility/fetchData";

const EditProfileImagePopup = ({ isOpen, onClose, initialData = {}, getData }) => {
  const [image, setImage] = useState(null);  
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    if (!image) {
      setErrors({ image: "Profile image is required." });
      return;
    }

    try {
     

      await FetchData(
        `profiles/profile-picture`, 
        {
          method: "PATCH",
          body: JSON.stringify({
            imageFile : image
          }), 
        },
        { "Content-Type": "multipart/form-data" } 
      );
      
      getData();
      onClose();
    } catch (e) {
      console.error("Error updating profile image:", e);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setImage(file);
      if (errors.image) {
        setErrors({ ...errors, image: "" }); 
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit Profile Image">
      <div className={styles.body}>
        <label>
          Profile Image*
          <input
            type="file"
            name="image"
            accept="image/*" 
            onChange={handleImageChange}
            className={`${styles.input} ${errors.image ? styles.error : ""}`}
          />
          {errors.image && <span className={styles.errorMessage}>{errors.image}</span>}
        </label>
      </div>
      <div className={styles.footer}>
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
      </div>
    </ContainerForm>
  );
};

export default EditProfileImagePopup;
