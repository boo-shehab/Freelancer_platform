import { useEffect, useState } from 'react';
import styles from './TwoStageFormPopup.module.css'
import CustomButton from '../customButton/CustomButton';
import Dropbutton from '../../CustomIcons/Dropbutton';
import MediaIcon from '../../CustomIcons/MediaIcon';
import DocumentIcon from '../../CustomIcons/DocumentIcon';

import { useAppStore } from '../../store';
const options = ["UIUX Designer", "Back-end", "Front-end", "Mobile app"];
const TwoStageFormPopup = ({ isOpen, onClose }) => {
  const {projectsPosts, addNewProjectPost} = useAppStore((state) => state)
  const [stage, setStage] = useState(1);
  const [CurrentOption, setCurrentOption] = useState("Select option");
  const [showSelectoption, setshowSelectoption] = useState(false);
  const [formData, setFormData] = useState({ 
    qualification: '', 
    description: '', 
    files: [],
    duration: "",
    pricingType: 0,
    price: ""
  });

  const handleNext = () => setStage(stage + 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, files: [...formData.files, e.target.files[0]] });
  };

  const handleSave = (e) => {
    addNewProjectPost(formData)
    setFormData({ 
      qualification: '', 
      description: '', 
      files: [],
      duration: "",
      pricingType: 0,
      price: ""
    })
    onClose()
  }
  useEffect(()=> {
    console.log(projectsPosts);
  }, [projectsPosts])
  
  if (!isOpen) return null;

  return (
    <div id={styles["popup-overlay"]}>
      <div className={styles["popup-content"]}>
        <div className={styles.header}>
            <h2>Create a project</h2>
            <button onClick={onClose} className={styles["close-btn"]}>X</button>
        </div>
        <div className={styles["progress-bar"]}>
          <div className={`${styles['progress-segment']} ${stage >= 1 ? styles.active : ''}`}></div>
          <div className={`${styles['progress-segment']} ${stage >= 2 ? styles.active : ''}`}></div>
        </div>

        {stage === 1 && (
          <form>
            <label>
              Select Required Qualifications
            </label>
            <button className={ CurrentOption === "Select option" ? styles.Selectoption : styles.SelectoptionWithactive} onClick={()=>setshowSelectoption(!showSelectoption)}>
                    {CurrentOption}
                   <Dropbutton />
              </button>
              <div className={styles.Selectoptionchose} style={{display: showSelectoption ? "block" : "none"}}>
                    {options.map((option) => (
                      <button
                        key={option}
                        className={CurrentOption === option ? styles.SelectoptionchoseActive : ''}
                        onClick={() => setCurrentOption(option)}
                      >
                        {option}
                      </button>
                    ))}</div>
            <label>
              Description
              <textarea
                name="description"
                placeholder="Enter Description for the project"
                value={formData.description}
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
              <input id="mediaUpload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
              <input id="documentUpload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
              <button type="button" onClick={handleNext} className={styles["next-btn"]}>Next &gt;</button>
            </div>

          </form>
        )}
        {stage === 2 && (
            <form>
            <label>
              Description
              <input
                type='text'
                name="duration"
                placeholder="duration of the project"
                value={formData.duration}
                onChange={handleChange}
                required
              ></input>
            </label>
                <label>
                     Price Per Hour
                    <input name='price' value={formData.price} onChange={handleChange} type="text" placeholder='Enter price' />
                </label>
            <div className={styles.spacer} />
                <CustomButton onClick={(handleSave)}>Add Project +</CustomButton>
            </form>
        )}
      </div>
    </div>
  );
};

export default TwoStageFormPopup;
