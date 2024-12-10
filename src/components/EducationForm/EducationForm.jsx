import React, { useEffect, useState } from "react";
import styles from "./EducationForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";

const EducationForm = ({isOpen, onClose, initialData, onSave}) => {
  
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 50 }, (_, i) => `${1975 + i}`);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(`${formData.startMonth} 1, ${formData.startYear}`);
    const endDate = new Date(`${formData.endMonth} 1, ${formData.endYear}`);

    if (startDate > endDate) {
      alert("Start date must be before the end date.");
      return;
    }

    console.log("Form Data Submitted:", formData);
  };

  
  if(!isOpen) return null;

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName={`${initialData? "Add Eduction" : "Edit Education"}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
            School*
            <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className={styles.input}
            required
            />
        </label>

        <label className={styles.label}>
            Degree*
            <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className={styles.input}
            required
            />
        </label>

        <div className={styles.row}>
            <div className={styles.col}>
            <label className={styles.label}>
                Start Month
                <select
                name="startMonth"
                value={formData.startMonth}
                onChange={handleChange}
                className={styles.select}
                required
                >
                <option value="">Select Month</option>
                {months.map((month) => (
                    <option key={month} value={month}>
                    {month}
                    </option>
                ))}
                </select>
            </label>
            </div>

            <div className={styles.col}>
            <label className={styles.label}>
                Start Year
                <select
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                className={styles.select}
                required
                >
                <option value="">Select Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>
                ))}
                </select>
            </label>
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.col}>
            <label className={styles.label}>
                End Month
                <select
                name="endMonth"
                value={formData.endMonth}
                onChange={handleChange}
                className={styles.select}
                required
                >
                <option value="">Select Month</option>
                {months.map((month) => (
                    <option key={month} value={month}>
                    {month}
                    </option>
                ))}
                </select>
            </label>
            </div>

            <div className={styles.col}>
            <label className={styles.label}>
                End Year
                <select
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                className={styles.select}
                required
                >
                <option value="">Select Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>
                ))}
                </select>
            </label>
            </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
              Save
          </button>
        </div>
        </form>
    </ContainerForm>
  );
};

export default EducationForm;
