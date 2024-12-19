import React, { useState } from "react";
import styles from "./EditProfilePopup.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import FetchData from "../../utility/fetchData";

const EditProfilePopup = ({ isOpen, onClose, initialData = {} , getData , isFreelancer = true }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [specialization, setSpecialization] = useState(initialData?.specialization || "");
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "First Name is required.";
    if (!specialization.trim()) newErrors.specialization = "Specialization is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    try {
      await FetchData(isFreelancer ? 'freelancers' : 'clients',
        {
          method: "PATCH",
          body: JSON.stringify( isFreelancer ? { name, qualificationName: specialization }
                                             : { name, companyName : specialization }
          ) ,
        },
        { "Content-Type": "application/json" }
      );
      getData();
      onClose();
    } catch (e) {
      console.error("Error updating profile:", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "specialization") setSpecialization(value);
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" }); 
    }
  };

  if (!isOpen) return null;

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit Name and Specialization">
      <div className={styles.body}>
        <label>
          First Name*
          <input
            type="text"
            name="name" // Add name attribute for handling change
            value={name}
            onChange={handleChange}
            placeholder="First Name"
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </label>
        {isFreelancer ? (
           <label>
          Specialization*
          <select
            name="specialization"
            value={specialization}
            onChange={handleChange}
            className={`${styles.select} ${errors.specialization ? styles.error : ""}`}
          >
            <option value="" disabled>
              Select specialization
            </option>
            <option value="backend">Back-end</option>
            <option value="frontend">Front-end</option>
            <option value="fullstack">Full-stack</option>
            <option value="mobile">Mobile</option>
            <option value="ui">UI/UX</option>
          </select>
          {errors.specialization && <span className={styles.errorMessage}>{errors.specialization}</span>}
        </label>
       ):(
        <label>
        Comapny Name*
        <input
          name="specialization"
          value={specialization}
          onChange={handleChange}
          className={`${styles.select} ${errors.specialization ? styles.error : ""}`}
        />
        {errors.specialization && <span className={styles.errorMessage}>{errors.specialization}</span>}
      </label>
       )}
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
