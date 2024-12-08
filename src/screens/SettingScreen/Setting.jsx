import React, { useState } from "react";
import styles from "./Setting.module.css";
import AccountSetting from "../../CustomIcons/AccountSetting";
import PrivacyIcon from "../../CustomIcons/PrivacyIcon";
import Language from "../../CustomIcons/Language";
import AppearanceIcon from "../../CustomIcons/AppearanceIcon";
import SettingArrow from "../../CustomIcons/SettingArrow";
import LogoutIcon from "../../CustomIcons/LogoutIcon";
import DeleteAccountIcon from "../../CustomIcons/DeleteAccountIcon";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import CloseIcon from "../../CustomIcons/CloseIcon";
import ComntainerForm from "../../components/ComntainerForm/ComntainerForm";
import RadioComp from "../../components/RadioComp/RadioComp";
import MobileDrawer from "../../components/MobileDrawer/MobileDrawer";


function Setting() {
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  

  const handleChange = (value) => {
    
    setSelectedOption((prev) => (prev === value ? null : value));
  };



  return (
    <>
    <div className={styles.mainCont}>
      <div className={styles.settingCont}>
        <div className={styles.options}>
          <ul>
            <li>
              <a>
                <AccountSetting /> account setting
              </a>
              <SettingArrow />
            </li>
            <li>
              <a>
                <PrivacyIcon /> privacy & security
              </a>
              <SettingArrow />
            </li>
            <li>
              <a>
                <Language /> language
              </a>
              <SettingArrow />
            </li>
            <li>
              <a>
                <AppearanceIcon /> appearance
              </a>
              <SettingArrow />
            </li>
          </ul>
        </div>
        <div className={styles.options}>
          <ul>
            <li onClick={() => {setOpenModal(true); setOpenDrawer(true)}}>
              <a>
                <LogoutIcon /> Logout
              </a>
              <SettingArrow />
            </li>
            <li className={styles.notMobileDelete} onClick={() => setOpenDelete(true)}>
              <a>
                <DeleteAccountIcon />
                Delete Account
              </a>
              <SettingArrow />
            </li>
          </ul>
        </div>
          
        <LogoutModal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <div className={styles.logoutModal}>
            <div className={styles.modalHeader}>
              <button
                className={styles.closeBtn}
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon />
              </button>
              <h3>Are you sure you want to log out?</h3>
            </div>
            <div className={styles.btnCont}>
              <button className={styles.logout}>Logout</button>
              <button
                onClick={() => setOpenModal(false)}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </LogoutModal>
       
        <ComntainerForm isOpen={openDelete} onClose={() => setOpenDelete(false)} HeadName="Delete Account">
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
        </ComntainerForm>
          
        <MobileDrawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)}>
          <div className={styles.logoutCont}>
        <div className={styles.drwerTopLine}></div>
        <div className={styles.logoutModal}>
            <div className={styles.modalHeader}>
              <button
                className={styles.closeBtn}
                onClick={() => setOpenDrawer(false)}
              >
                <CloseIcon />
              </button>
              <h3>Are you sure you want to log out?</h3>
              <gap></gap>
            </div>
            <div className={styles.btnCont}>
              <button className={styles.logout}>Logout</button>
              <button
                onClick={() => setOpenDrawer(false)}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
          </div>
      </MobileDrawer>
      </div>
      </div>
    </>
  );
}

export default Setting;
