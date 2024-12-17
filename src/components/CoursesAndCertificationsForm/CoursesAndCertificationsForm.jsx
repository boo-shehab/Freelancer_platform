import React, { useState } from "react";
import styles from "./CoursesAndCertificationsForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import FetchData from "../../utility/fetchData";

const CoursesAndCertificationsForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Issuer: "",
    CredentialId: "",
    CredentialUrl: "",
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
  const addNewCertifications = async () => {
    try {
      await FetchData(`freelancers/certifications`, {
        method: 'POST',
        body: JSON.stringify({
          name : formData.Name ,
          issuer : formData.Issuer  ,
          credentialId : formData.CredentialId ,
          credentialUrl : formData.CredentialUrl ,
          issueDate : formData.startMonth +"-"+formData.startYear,
          expiryDate : formData.endMonth +"-"+formData.endYear,
        }),
      }, {
        'Content-Type': 'application/json'
      });

    } catch (error) {
      setErrorMessage('Failed to add the skill. Please try again.');
      console.error(error);
    }
  }
  const years = Array.from({ length: 50 }, (_, i) => `${1975 + i}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { startMonth, startYear, endMonth, endYear, Name, Issuer, CredentialId, CredentialUrl } = formData;

    if (!Name || !Issuer || !CredentialId || !CredentialUrl || !startMonth || !startYear || !endMonth || !endYear) {
      alert("Please fill out all required fields.");
      return;
    }

    const startDate = new Date(`${startMonth} ${startYear}`);
    const endDate = new Date(`${endMonth} ${endYear}`);

    if (startDate > endDate) {
      alert("Start date must be before the end date.");
      return;
    }
    addNewCertifications();

    console.log("Submitted Data:", {
      ...formData
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit Courses and Certifications">
      <label className={styles.label}>
        Name*
        <input
          type="text"
          name="Name"
          placeholder="Enter course or certification name"
          value={formData.Name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        Issuing organization*
        <input
          placeholder="Enter the organization"
          name="Issuer"
          value={formData.Issuer}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        Credential ID*
        <input
          type="text"
          name="CredentialId"
          placeholder="Enter ID"
          value={formData.CredentialId}
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

      <label className={styles.label}>
        Credential URL*
        <input
          type="text"
          name="CredentialUrl"
          placeholder="Enter URL"
          value={formData.CredentialUrl}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </ContainerForm>
  );
};

export default CoursesAndCertificationsForm;
