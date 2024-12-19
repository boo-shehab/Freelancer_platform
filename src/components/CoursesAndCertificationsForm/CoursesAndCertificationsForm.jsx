import React, { useState } from "react";
import styles from "./CoursesAndCertificationsForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import FetchData from "../../utility/fetchData";
import dayjs from "dayjs";

const CoursesAndCertificationsForm = ({
  isOpen,
  onClose,
  getAllCertifications,
}) => {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");

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

  const clearData = () => {
    setName("");
    setCredentialUrl("");
    setCredentialId("");
    setEndMonth("");
    setEndYear("");
    setStartMonth("");
    setStartYear("");
    setIssuer("");
  };

  const addNewCertifications = async () => {
    const issueDate = dayjs(`${startYear}-${startMonth}-01`).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    const expiryDate = dayjs(`${startYear}-${startMonth}-01`).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    if (!name || !issuer) {
      alert("Please fill out all required fields.");
      return;
    }
    if (issueDate > expiryDate) {
      alert("Start date must be before the end date.");
      return;
    }
    const data = {
      name,
      issuer,
      credentialId: !credentialId ? null : credentialId,
      credentialUrl: !credentialUrl ? null : credentialUrl,
      issueDate,
      expiryDate,
    };

    try {
      await FetchData(
        `freelancers/certifications`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {
      setErrorMessage("Failed to add the skill. Please try again.");
      console.error(error);
    }
    getAllCertifications(localStorage.getItem("id"));
    clearData();
    onClose();
  };
  const years = Array.from({ length: 50 }, (_, i) => `${1975 + i}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <ContainerForm
      isOpen={isOpen}
      onClose={onClose}
      HeadName="Edit Courses and Certifications"
    >
      <label className={styles.label}>
        Name*
        <input
          type="text"
          name="Name"
          placeholder="Enter course or certification name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        Issuing organization*
        <input
          placeholder="Enter the organization"
          name="Issuer"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        Credential ID
        <input
          type="text"
          name="CredentialId"
          placeholder="Enter ID"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
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
              onChange={(e) => setStartYear(e.target.value)}
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
              onChange={(e) => setEndMonth(e.target.value)}
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
              onChange={(e) => setEndYear(e.target.value)}
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
        Credential URL
        <input
          type="text"
          name="CredentialUrl"
          placeholder="Enter URL"
          value={credentialUrl}
          onChange={(e) => setCredentialUrl(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={addNewCertifications}>
          Save
        </button>
      </div>
    </ContainerForm>
  );
};

export default CoursesAndCertificationsForm;
