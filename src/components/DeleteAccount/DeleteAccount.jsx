import React, { useState } from 'react'
import styles from "./DeleteAccount.module.css";
import RadioComp from '../RadioComp/RadioComp';
import CloseIcon from '../../CustomIcons/CloseIcon';

function DeleteAccount() {
    const [selectedOption, setSelectedOption] = useState(null);


    const handleChange = (value) => {
    
        setSelectedOption((prev) => (prev === value ? null : value));
      };
  return (
    <div className={styles.deleteModal}>
    <div className={styles.deleteModalHeader}>
      <button
        className={styles.closeBtn}
        onClick={() => setOpenDelete(false)}
      >
        <CloseIcon />
      </button>
      <div>
        <h3>Delete Account</h3>
        <p>
          We’re really Sorry To See You To Go, are you sure you want to
          delete your account ? Once you confirm Your data will gone.
        </p>
      </div>
    </div>
    <div className={styles.radio}>
    <RadioComp value="option1" checked={selectedOption === "option1"} onChange={() => handleChange("option1")}><p>I am no longer using my account</p></RadioComp>
    <RadioComp value="option2" checked={selectedOption === "option2"} onChange={() => handleChange("option2")}> <p>I want to change my phone number</p> </RadioComp>
    <RadioComp value="option3" checked={selectedOption === "option3"} onChange={() => handleChange("option3")}> <p> I don't understand how to use it</p></RadioComp>
    <RadioComp value="option4" checked={selectedOption === "option4"} onChange={() => handleChange("option4")}> <p>I need a break</p></RadioComp>
    <RadioComp value="option5" checked={selectedOption === "option5"} onChange={() => handleChange("option5")}> <p>Other</p></RadioComp>
   </div>
   <button className={`${styles.deleteAccount} ${
  selectedOption ? styles.activeButton : ''
}`}
disabled={!selectedOption}>Delete Account</button>
  </div>
  )
}

export default DeleteAccount