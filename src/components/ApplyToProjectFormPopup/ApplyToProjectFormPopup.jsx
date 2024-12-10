import { useEffect, useState } from "react";
import styles from "./ApplyToProjectFormPopup.module.css";
import CloseIcon from "../../CustomIcons/CloseIcon";
import CustomButton from "../customButton/CustomButton";
import ContainerForm from "../ContainerForm/ContainerForm"

const ApplyToProjectFormPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [notes, setNotes] = useState("");
  const [formData, setFormData] = useState({ 
   name:'',
   email:'',
   specialization:'',
   notes:''
  });
  const [disabled,setDisabled]= useState(true)
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if(name!=='' && isValidEmail(email)){
    setFormData([name,email,specialization,notes])
    
    onClose();}
  };
  useEffect(() => {
    if(name!=='' && isValidEmail(email)) setDisabled(false)
      else setDisabled(true)
  }, [name, email]);

  if (!isOpen) return null;

  return (
    // <div id={styles["popup-overlay"]}>
    //   <div className={styles["popup-content"]}>
    //     <div className={styles["close-btn-div"]}>
    //       <button onClick={onClose} className={styles["close-btn"]}>
    //         <CloseIcon />
    //       </button>
    //     </div>
    <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="">
      <div className={styles["image-div"]}>
        <img className={styles["image"]} src={"avatar.png"} />
      </div>
      <h3>Full-Sack Developer</h3>

      <div className={styles["form"]}>
        <label>Name*</label>
        <input
          placeholder="Enter your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ border: name !== "" ? " 1px solid #3C97AF" : "" }}
        />
      </div>
      <div className={styles["form"]}>
        <label>Email*</label>
        <input
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{border: isValidEmail(email)?'1px solid #3C97AF':''}}
        />
      </div>
      <div className={styles["form"]}>
        <label>Specialization</label>
        <input
          placeholder="Enter your Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
      </div>
      <div className={styles["form"]}>
        <label>Notes</label>
        <textarea
          placeholder="Add Your Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <CustomButton  onClick={handleSave} disabled={disabled} className={styles["apply-btn"]}>Apply Now</CustomButton>
    </ContainerForm>
    //   </div>
    // </div>
  );
};

export default ApplyToProjectFormPopup;
