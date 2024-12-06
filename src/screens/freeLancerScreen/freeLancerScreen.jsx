import React, { useState } from "react";
import styles from "./freeLancerScreen.module.css";
import FilterSide from "../../components/filterSide/filterSide";
import { Slider, ConfigProvider } from "antd";
const freeLancerScreen = () => {
  const [value, setValue] = useState([0, 5000]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const handleJobSelection = (jobId) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(jobId)
        ? prevSelected.filter((id) => id !== jobId) // Remove if already selected
        : [...prevSelected, jobId]
    );
  };
  const clearAllSelections = () => {
    setSelectedJobs([]);
  };
  const onInputChange = (index, newValue) => {
    const updatedValue = [...value];
    const numericValue = Number(newValue);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5000) {
      updatedValue[index] = numericValue;
      setValue(updatedValue);
    }
  };
  const onSliderChange = (newValue) => {
    setValue(newValue);
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
            <div className={styles.timeLineSelector}>
              <select name="" id="" className={styles.selectTime}>
                {" "}
                <option value="" disabled selected hidden>
                  Month
                </option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                {/* <option value="">4</option> 
                <option value="">5</option> 
                <option value="">6</option>
                <option value="">7</option>
                <option value="">8</option>
                <option value="">9</option>
                <option value="">10</option> 
                <option value="">11</option> 
                <option value="">12</option> */}
              </select>
              <select name="" id="" className={styles.selectTime}>
                <option value="" disabled selected hidden>
                  Days
                </option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                {/* <option value="">4</option> 
                <option value="">5</option> 
                <option value="">6</option>
                <option value="">7</option>
                <option value="">8</option>
                <option value="">9</option>
                <option value="">10</option> 
                <option value="">11</option> 
                <option value="">12</option>
                <option value="">14</option>
                <option value="">15</option>
                <option value="">16</option>
                <option value="">17</option> 
                <option value="">18</option> 
                <option value="">19</option>
                <option value="">20</option>
                <option value="">21</option>
                <option value="">22</option>
                <option value="">23</option> 
                <option value="">24</option> 
                <option value="">25</option>
                <option value="">26</option>
                <option value="">27</option>
                <option value="">28</option>
                <option value="">29</option> 
                <option value="">30</option>  */}
              </select>
            </div>
          </div>
          <div className={styles.priceRage}>
            <h3 className={styles.PriceRageHeader}>Price Rage</h3>
            <div className={styles.priceShowUp}>
              <input
                className={styles.priceShowUpInput}
                type="text"
                value={value[0]}
                onChange={(e) => onInputChange(0, e.target.value)} // Update second value
              />
              <small>to</small>
              <input
                className={styles.priceShowUpInput}
                type="text"
                value={value[1]}
                onChange={(e) => onInputChange(1, e.target.value)} // Update second value
              />
            </div>
          </div>
          <ConfigProvider
            theme={{
              components: {
                Slider: {
                  fontSize: 12,
                  lineHeight: 18,
                  colorPrimary: "#3C97AF",
                  trackBg: "#3C97AF",
                  trackBgDisabled: "#3C97AF",
                  trackHoverBg: "#3C97AF",
                  railBg: "#BFBFBF",
                  handleActiveColor: "#3C97AF",
                  handleColor: "#3C97AF",
                  handleActiveColor: "#3C97AF",
                  colorBgElevated: "#3C97AF",
                  colorPrimaryBorderHover: "#3C97AF",
                },
              },
            }}
          >
            <Slider
              range
              max={5000}
              min={0}
              value={value}
              onChange={onSliderChange}
              tipFormatter={(value) => `${value}$`}
              className={styles.marginSlider}
            />
          </ConfigProvider>

          <div className={styles.editProfileFreeLancerSide}>
            <h3>Profile</h3>
          </div>
        </div>
      </FilterSide>
    </>
  );
};
export default freeLancerScreen;
