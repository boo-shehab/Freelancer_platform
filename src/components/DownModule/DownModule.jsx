import { useEffect, useState } from 'react';
import styles from './DownModule.module.css';

const TwoStageFormPopup = ({ isOpen, onClose, Hight , HeadName="Filter Projects" , children}) => {
  if (!isOpen) return null;

  return (
    <div id={styles["downModel-overlay"]}>
      <div className={styles["downModel-content"]} style={{ height: Hight }}>
          <div className={styles.downModelHeader}>
            <div className={styles.borderOFheaderform}></div>
          </div>
          <div className={styles.downModelTitle}>
              <button onClick={onClose} >x</button>
              <h1>{HeadName}</h1>
              <div></div>
          </div>
          {children}
      </div>
    </div>
  );
};

export default TwoStageFormPopup;
