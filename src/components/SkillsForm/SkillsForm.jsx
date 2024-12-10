import React, { useEffect, useState } from "react";
import styles from "./SkillsForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import CloseIcon from "../../CustomIcons/CloseIcon";

const SkillsForm = ({isOpen, onClose, initialData = [], onSave}) => {
  
  const [formData, setFormData] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  const handleChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData([...formData, newSkill])
    setNewSkill('')
    console.log("Form Data Submitted:", formData);
  };

  const handleDelete = (s) => {
    setFormData(formData.filter((skill) => skill !== s))
  }
  
  if(!isOpen) return null;

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName={`Edit Skills`}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
            Skill’s Name*
            <input
            type="text"
            name="skill"
            value={newSkill}
            placeholder="enter skill’s name"
            onChange={handleChange}
            className={styles.input}
            required
            />
        </label>

        {formData.length > 0 && (
          <div className={styles.listContainer}>
            {formData.map((skill) => (
              <div key={skill} className={styles.item}>
                <button onClick={() => handleDelete(skill)}><CloseIcon /></button>
                <span>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
              add
          </button>
        </div>
        </form>
    </ContainerForm>
  );
};

export default SkillsForm;
