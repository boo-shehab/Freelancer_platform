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

function Setting() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
            <li onClick={() => setOpenModal(true)}>
              <a>
                <LogoutIcon /> Logout
              </a>
              <SettingArrow />
            </li>
            <li>
              <a>
                <DeleteAccountIcon />Delete Account
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
      </div>
    </>
  );
}

export default Setting;
