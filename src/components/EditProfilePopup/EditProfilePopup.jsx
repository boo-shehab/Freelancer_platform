import React, { useState } from "react";
import styles from "./EditProfilePopup.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";

const EditProfilePopup = ({ isOpen, onClose, initialData, onSave }) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [specialization, setSpecialization] = useState(initialData?.specialization || "");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    onSave({ firstName, lastName, specialization });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit Name and Specialization">
        <div className={styles.body}>
          <label>
            First Name*
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className={`${styles.input} ${errors.firstName ? styles.error : ""}`}
            />
            {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
          </label>
          <label>
            Last Name*
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className={`${styles.input} ${errors.lastName ? styles.error : ""}`}
            />
            {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
          </label>
          <label>
            Specialization
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Specialization</option>
              <option value="Full-Stack Developer">Full-Stack Developer</option>
              <option value="Front-End Developer">Front-End Developer</option>
              <option value="Back-End Developer">Back-End Developer</option>
            </select>
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

export default EditProfilePopup;
