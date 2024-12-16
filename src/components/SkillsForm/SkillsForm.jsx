import React, { useState } from "react";
import styles from "./SkillsForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import FetchData from "../../utility/fetchData";

const EditSkillsForm = ({ isOpen, onClose, GetAllSkills }) => {
  const [newSkill, setNewSkill] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addNewSkill = async () => {
    if (!newSkill.trim()) {
      setErrorMessage('Skill name is required.');
      return;
    }
    try {
      await FetchData('skills', {
        method: 'POST',
        body: JSON.stringify({
          name: newSkill.trim(),
        }),
      });

      const id = localStorage.getItem('id'); 
      GetAllSkills(id);

      setNewSkill('');
      onClose();
    } catch (error) {
      setErrorMessage('Failed to add the skill. Please try again.');
      console.error(error);
    }
  };

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit Skills">
      <label className={styles.label}>
        Skill’s Name*
        <input
          type="text"
          name="skill"
          value={newSkill}
          placeholder="Enter skill’s name"
          onChange={(e) => setNewSkill(e.target.value)}
          className={styles.input}
          required
        />
      </label>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.buttonContainer}>
        <button onClick={addNewSkill} className={styles.button}>
          Add
        </button>
      </div>
    </ContainerForm>
  );
};

export default EditSkillsForm;
