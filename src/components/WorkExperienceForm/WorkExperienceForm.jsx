import React, { useEffect, useState } from "react";
import styles from "./WorkExperienceForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import FetchData from "../../utility/fetchData";
import dayjs from "dayjs";

const WorkExperienceForm = ({isOpen, onClose , initialData = "" , GetDate}) => {
  
  const [formData, setFormData] = useState({
    jobTitle: "",
    employmentType: "",
    clientName: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });
  // const { accessToken, userDetails } = data.results;
        // const { id , role } = userDetails;

        // // Save sensitive data securely
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('id', id);

        // addUserInfo(userDetails);

        // console.log('User Details:', isFreelancer);

        // navigate('/');

  const addNewWorkEx = async () => {

    try {
      const response = await FetchData(
          `freelancers/work-experience`,
          {
              method: 'POST',
              body: JSON.stringify({
                  jobTitle: formData.jobTitle,
                  isCurrent: false ,
                  employmentType: formData.employmentType,
                  employerName: formData.clientName,
                  startDate: dayjs(`${formData.startYear}-${formData.startMonth}-01`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                  endDate: dayjs(`${formData.endYear}-${formData.endMonth}-01`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              }),
              headers: { 'Content-Type': 'application/json' }
          }
      );
  
      if (response.ok) {
          console.log("Data submitted successfully.");
          // Handle successful response, e.g., clear form or display success message
      } else {
          console.error("Error submitting data:", response.statusText);
          // Handle unsuccessful response
      }
  } catch (error) {
      console.error("An error occurred:", error.message || 'An unexpected error occurred.');
  } finally {
    GetDate();
    onClose();
  }
  
};

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

  // useEffect(() => {
  //   if (initialData) {
  //     setFormData(initialData);
  //   }
  // }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
    
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
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName={`${initialData? "Add Work Experience" : "Edit Work Experience"}`}>
        <label className={styles.label}>
            Job Title*
            <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className={styles.input}
            required
            />
        </label>

        <label className={styles.label}>
            Employment Type*
            <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className={styles.input}
                required
                >
                <option value="" disabled>Select employment type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
            </select>
        </label>

        <label className={styles.label}>
            company/client Name*
            <input
            type="text"
            name="clientName"
            value={formData.clientName}
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
          <button className={styles.button} onClick={addNewWorkEx}>
              Save
          </button>
        </div>
    </ContainerForm>
  );
};

export default WorkExperienceForm;
