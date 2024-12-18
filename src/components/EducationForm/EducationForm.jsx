import React, { useEffect, useState } from "react";
import styles from "./EducationForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import dayjs from "dayjs";
import FetchData from "../../utility/fetchData";

const EducationForm = ({ isOpen, onClose, initialData , GetEducations}) => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setstartYear] = useState("");
  const [endMonth, setendMonth] = useState("");
  const [endYear, setendYear] = useState("");

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





  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const resp = await FetchData(
        "freelancers/education",
        {
          method: "POST",
          body:  JSON.stringify({
            degree: degree,
            institution: school,
            startDate:(`${startYear}-${startMonth}-01`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            endDate: dayjs(`${endYear}-${endMonth}-01`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          }),
        }
      );
    
        const responseData = await resp.json();
        console.log("Response Data:", responseData);
       
    } catch (error) {
      console.error("Request failed:", error);
    }
    GetEducations();
    onClose();
  };
  
  
 



  if (!isOpen) return null;
  
  const handleAddEducation = async () => {
    console.log({
      school,
      degree,
      startDate: dayjs(startYear, startMonth, 1),
      endDate: dayjs(endYear, endMonth, 1),
    });
  };

  return (
    <ContainerForm
      isOpen={isOpen}
      onClose={onClose}
      HeadName={`${initialData ? "Add Eduction" : "Edit Education"}`}
    >
      <div onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          School*
          <input
            type="text"
            name="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          Degree*
          <input
            type="text"
            name="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
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
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
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
                value={startYear}
                onChange={(e) => setstartYear(e.target.value)}
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
                value={endMonth}
                onChange={(e) => setendMonth(e.target.value)}
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
                value={endYear}
                onChange={(e) => setendYear(e.target.value)}
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
          <button onClick={handleSubmit} className={styles.button}>
            Save
          </button>
        </div>
      </div>
    </ContainerForm>
  );
};

export default EducationForm;
