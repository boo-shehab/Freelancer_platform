import { useEffect, useState } from "react";
import styles from "./TwoStageFormPopup.module.css";
import CustomButton from "../customButton/CustomButton";
import Dropbutton from "../../CustomIcons/Dropbutton";
import MediaIcon from "../../CustomIcons/MediaIcon";
import DocumentIcon from "../../CustomIcons/DocumentIcon";
import RedCross from "../../CustomIcons/redCross";

import { useAppStore } from "../../store";
import fetchData from "../../utility/fetchData";
const options = ["uiux", "backend", "frontend", "mobile"];
const TwoStageFormPopup = ({ isOpen, onClose }) => {
  const { projectsPosts, addNewProjectPost } = useAppStore((state) => state);
  const [stage, setStage] = useState(1);
  const [CurrentOption, setCurrentOption] = useState("Select option");
  const [showSelectoption, setshowSelectoption] = useState(false);
  const [formData, setFormData] = useState({
    Title: "",
    QualificationName: "",
    Description: "",
    files: [],
    Duration: "",
    PriceType: 0,
    Budget: "",
  });

  const handleNext = () => setStage(stage + 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, files: [...formData.files, e.target.files[0]] });
  };

  const handleSave = async(e) => {
    addNewProjectPost(formData);
    try{
      const dataSending = new FormData();
      dataSending.append('Title', formData.Title);
      dataSending.append('Description', formData.Description);
      dataSending.append('QualificationName', formData.QualificationName);
      dataSending.append('Duration', formData.Duration);
      dataSending.append('PriceType', 'fixed');
      dataSending.append('Budget', formData.Budget);

      await fetchData(`projects`, {
        method: 'POST',
        body: dataSending
      }, {
          'Accept': '*/*',
      });
    }catch(e) {
      console.log(e);
    }
    setFormData({
      QualificationName: "",
      Description: "",
      files: [],
      Duration: "",
      PriceType: 'fixed',
      Budget: "",
      
    });
    setStage(1)
    onClose();
  };
  useEffect(() => {
    console.log(projectsPosts);
  }, [projectsPosts]);

  if (!isOpen) return null;

  return (
    <div id={styles["popup-overlay"]}>
      <div className={styles["popup-content"]}>
        <div className={styles.header}>
          <h2>Create a project</h2>
          <button onClick={onClose} className={styles["close-btn"]}>
            <RedCross />
          </button>
        </div>
        <div className={styles["progress-bar"]}>
          <div
            className={`${styles["progress-segment"]} ${
              stage >= 1 ? styles.active : ""
            }`}
          ></div>
          <div
            className={`${styles["progress-segment"]} ${
              stage >= 2 ? styles.active : ""
            }`}
          ></div>
        </div>

        {stage === 1 && (
          <form>
            
            <label>
              Description
              <input
                type="text"
                name="Title"
                placeholder="Title of the project"
                value={formData.Title}
                onChange={handleChange}
                required
              ></input>
            </label>
            <label>Select Required Qualifications</label>
            <button
              className={
                CurrentOption === "Select option"
                  ? styles.Selectoption
                  : styles.SelectoptionWithactive
              }
              onClick={() => setshowSelectoption(!showSelectoption)}
            >
              {CurrentOption}
              <Dropbutton />
            </button>
            <div
              className={styles.Selectoptionchose}
              style={{ display: showSelectoption ? "block" : "none" }}
            >
              {options.map((option) => (
                <button
                  key={option}
                  className={
                    CurrentOption === option
                      ? styles.SelectoptionchoseActive
                      : ""
                  }
                  onClick={() => {
                    setFormData({ ...formData, ['QualificationName']: option });
                    setCurrentOption(option)
                    setshowSelectoption(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <label>
              Description
              <textarea
                name="Description"
                placeholder="Enter Description for the project"
                value={formData.Description}
                onChange={handleChange}
                required
              ></textarea>
            </label>

            <div className={styles.spacer} />
            <div className={styles["file-buttons"]}>
              <button type="button" className={styles.Uploadfile}>
                <MediaIcon />
              </button>
              <button type="button" className={styles.Uploadfile}>
                <DocumentIcon />
              </button>
              <input
                id="mediaUpload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <input
                id="documentUpload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={handleNext}
                className={styles["next-btn"]}
              >
                Next &gt;
              </button>
            </div>
          </form>
        )}
        {stage === 2 && (
          <form>
            <label>
              Description
              <input
                type="text"
                name="Duration"
                placeholder="duration of the project"
                value={formData.Duration}
                onChange={handleChange}
                required
              ></input>
            </label>
            <label>
              Price Per Hour
              <input
                name="Budget"
                value={formData.Budget}
                onChange={handleChange}
                type="text"
                placeholder="Enter price"
              />
            </label>
            <div className={styles.spacer} />
            <CustomButton onClick={handleSave}>Add Project +</CustomButton>
          </form>
        )}
      </div>
    </div>
  );
};

export default TwoStageFormPopup;
