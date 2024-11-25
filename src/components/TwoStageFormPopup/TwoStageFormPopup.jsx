import { useEffect, useState } from 'react';
import styles from './TwoStageFormPopup.module.css'
import CustomButton from '../customButton/CustomButton';
import { useAppStore } from '../../store';

const TwoStageFormPopup = ({ isOpen, onClose }) => {
  const {projectsPosts, addNewProjectPost} = useAppStore((state) => state)
  const [stage, setStage] = useState(1);
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
              <select name="qualification" value={formData.qualification} onChange={handleChange} required>
                <option value="">Select option</option>
                <option value="qualification1">Qualification 1</option>
                <option value="qualification2">Qualification 2</option>
              </select>
            </label>

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
              <button type="button" className={styles["file-btn"]} onClick={() => document.getElementById('mediaUpload').click()}>
                <img src="./image-upload.png" alt="" />
                Media
              </button>
              <button type="button" className={styles["file-btn"]} onClick={() => document.getElementById('documentUpload').click()}>
              <img src="./document-code.png" alt="" />
                Document
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
                Pricing Type
                <div className={styles['sacred-code']}>
                    <button type='button' onClick={() => setFormData({ ...formData, ['pricingType']: 1 })}>Per Hour</button>
                    <button type='button' onClick={() => setFormData({ ...formData, ['pricingType']: 2 })}>For The Project</button>
                </div>
            </label>
            {formData.pricingType >= 1 && (
                <label>
                    {formData.pricingType === 1? "Price Per Hour" : "Price For The Project"}
                    <input name='price' value={formData.price} onChange={handleChange} type="text" placeholder='Enter price' />
                </label>
            )}
            <div className={styles.spacer} />
                <CustomButton onClick={(handleSave)}>Add Project +</CustomButton>
            </form>
        )}
      </div>
    </div>
  );
};

export default TwoStageFormPopup;
