import React, { useState, useEffect } from "react";
import styles from "./freeLancerScreen.module.css";
import FilterSide from "../../components/filterSide/filterSide";
import { Slider, ConfigProvider } from "antd";
import DownModule from "../../components/DownModule/DownModule.jsx";

const freeLancerScreen = ({
  isPopupOpen2 = false,
  setIsPopupOpen2,
  result,
}) => {
  const [value, setValue] = useState(["minimum", "maximum"]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [sizeModule, setSizeModule] = useState(1);

  const handleJobSelection = (jobId) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(jobId)
        ? prevSelected.filter((id) => id !== jobId)
        : [...prevSelected, jobId]
    );
  };

  useEffect(() => {
    result(selectedJobs);
  }, [selectedJobs]);

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
  const deleteAndStop = () => {
    setIsPopupOpen2(false);
    setSelectedJobs([]);
  };
  const apply = () => {
    setIsPopupOpen2(false);
    selectedJobs;
  };
  const theme = {
    components: {
      Slider: {
        fontSize: 12,
        lineHeight: 18,
        colorPrimary: "#3C97AF",
        trackBg: "#3C97AF",
        trackBgDisabled: "#3C97AF",
        trackHoverBg: "#3C97AF",
        railBg: "#BFBFBF",
        handleColor: "#3C97AF",
        handleActiveColor: "#3C97AF",
        colorBgElevated: "#3C97AF",
        colorPrimaryBorderHover: "#3C97AF",
      },
    },
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
  const nameOfFreeLancer = [
    {
      id: 1,
      name: "Abdullah Ali",
      email: "alnashmieghifran@gmail.com",
      img: "/post.png",
    },
  ];

  return (
    <>
      <FilterSide selectedJobs={selectedJobs}>
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
              </select>
              <select name="" id="" className={styles.selectTime}>
                <option value="" disabled selected hidden>
                  Days
                </option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
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
                onChange={(e) => {
                  const newValue = e.target.value;
                  const numValue = parseFloat(newValue);
                  if (!isNaN(numValue)) {
                    const adjustedValue = Math.min(numValue, value[1]);
                    onInputChange(0, adjustedValue.toString());
                  } else {
                    onInputChange(0, newValue);
                  }
                }}
              />
              <small>to</small>
              <input
                className={styles.priceShowUpInput}
                type="text"
                value={value[1]}
                onChange={(e) => {
                  const newValue = e.target.value;

                  const numValue = parseFloat(newValue);

                  if (!isNaN(numValue)) {
                    const adjustedValue = Math.max(numValue, value[0]);
                    onInputChange(1, adjustedValue.toString());
                  } else {
                    onInputChange(1, newValue);
                  }
                }}
              />
            </div>
          </div>
          <ConfigProvider theme={theme}>
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
            <div className={styles.editProfileFreeLancerSideContent}>
              <img
                className={styles.FreeLancerSideContentImg}
                src="/public/avatar.png"
                alt=""
              />
              {nameOfFreeLancer.map((i) => (
                <div className={styles.FreeLancerSideContentText}>
                  <h4 className={styles.FreeLancerSideContentName}>{i.name}</h4>
                  <p className={styles.FreeLancerSideContentEmail}>{i.email}</p>
                </div>
              ))}
            </div>
            <p className={styles.FreeLancerSideSeeProfile}>See profile</p>
          </div>
        </div>
      </FilterSide>
      <DownModule
        Hight={sizeModule === 1 ? "94%" : ""}
        isOpen={isPopupOpen2}
        setSelectedJobs={setSelectedJobs}
        selectedJobs={selectedJobs}
        onClose={() => setIsPopupOpen2(false)}
      >
        <div className={styles.specializationResbonsive}>
          <h4 className={styles.specializationResbonsiveHeader}>
            Specialization
          </h4>{" "}
          <div className={styles.specializationResbonsiveChoose}>
            {optionOfFreelancing.map((i) => (
              <button
                key={i.Job}
                onClick={() => handleJobSelection(i.Job)}
                className={
                  selectedJobs.includes(i.Job)
                    ? styles.specializationResbonsiveChooseBtnActive
                    : styles.specializationResbonsiveChooseBtn
                }
              >
                {i.Job}
              </button>
            ))}
          </div>
         
          <div className={styles.timeLine}>
            <h3>Time Line</h3>
            <div className={styles.timeLineSelector}>
              <select name="" id="" className={styles.selectTimeResbonsive}>
                {" "}
                <option value="" disabled selected hidden>
                  Month
                </option>
                <option value="">1</option>
              </select>
              <select name="" id="" className={styles.selectTimeResbonsive}>
                <option value="" disabled selected hidden>
                  Days
                </option>
                <option value="">1</option>
              </select>
            </div>
          </div>
          <div className={styles.priceRage}>
            <h3 className={styles.PriceRageHeader}>Price Rage</h3>
            <div className={styles.priceShowUp}>
              <input
                className={styles.priceShowUpInputResponsive}
                type="text"
                value={value[0]}
                onChange={(e) => {
                  const newValue = e.target.value;
                  const numValue = parseFloat(newValue);
                  if (!isNaN(numValue)) {
                    const adjustedValue = Math.min(numValue, value[1]);
                    onInputChange(0, adjustedValue.toString());
                  } else {
                    onInputChange(0, newValue);
                  }
                }}
              />
              <small className={styles.smallResponsive}>to</small>
              <input
                className={styles.priceShowUpInputResponsive}
                type="text"
                value={value[1]}
                onChange={(e) => {
                  const newValue = e.target.value;
                  const numValue = parseFloat(newValue);
                  if (!isNaN(numValue)) {
                    const adjustedValue = Math.max(numValue, value[0]);
                    onInputChange(1, adjustedValue.toString());
                  } else {
                    onInputChange(1, newValue);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <ConfigProvider theme={theme} className={styles.marginSliderResponsive}>
          <Slider
            range
            max={5000}
            min={0}
            value={value}
            onChange={onSliderChange}
            tipFormatter={(value) => `${value}$`}
            style={{
              width: "98%",
            }}
          />
        </ConfigProvider>
        <div className={styles.ResponsiveFooterBtn}>
          <button
            className={styles.ResponsiveFooterBtnCancelSort}
            onClick={deleteAndStop}
          >
            Cancel Sort
          </button>
          <button className={styles.ResponsiveFooterBtnApply} onClick={apply}>
            Apply
          </button>
        </div>
      </DownModule>
    </>
  );
};
export default freeLancerScreen;
