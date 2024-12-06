import React, { useState } from "react";
import styles from "./freeLancerScreen.module.css";
import FilterSide from "../../components/filterSide/filterSide";
const freeLancerScreen = () => {
  const [isGreen, setIsGreen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const handleJobSelection = (jobId) => {
    setSelectedJobs(
      (prevSelected) =>
        prevSelected.includes(jobId)
          ? prevSelected.filter((id) => id !== jobId) // Remove if already selected
          : [...prevSelected, jobId] // Add if not selected
    );
  };
  const clearAllSelections = () => {
    setSelectedJobs([]);
  };
  const optionOfFreelancing = [
    {
      id: 1,
      Job: "Full-Stack",
    },
    {
      id: 2,
      Job: "Front End ",
    },
    {
      id: 3,
      Job: "Mobile Developer",
    },
    {
      id: 4,
      Job: "UI UX Designer",
    },
    {
      id: 5,
      Job: "Back End",
    },
  ];
  return (
    <>
      <FilterSide>
        <div className={styles.freeLancer}>
          <div className={styles.freeLancerHeader}>
            <h1 className={styles.filterHead}>Filter</h1>

            <p className={styles.clearAll} onClick={clearAllSelections}>
              Clear all
            </p>
          </div>
          <div className={styles.specializationFilter}>
            <h4 className={styles.specializationHead}>specializationFilter</h4>
            <div className={styles.specializationBody}>
              <div className={styles.spacing}>
                {optionOfFreelancing.map((job) => (
                  <div key={job.id} className={styles.Options}>
                    <button
                      className={`${styles.btn} ${
                        selectedJobs.includes(job.id) ? styles.btnGreen : ""
                      }`}
                      onClick={() => handleJobSelection(job.id)}
                    ></button>
                    <p>{job.Job}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
         
          <div className={styles.timeLine}>
            <h3>Time Line</h3>
          <select name="" id="" className={styles.selectTime}>
            <option value="">1</option>
            <option value="">4</option>
          </select>
          <select name="" id="" className={styles.selectTime}>
            <option value="">1</option>
            <option value="">4</option>
          </select>
          </div>


          hg
        </div>
      </FilterSide>
    </>
  );
};
export default freeLancerScreen;
