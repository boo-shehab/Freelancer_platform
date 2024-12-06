import { useEffect, useState } from 'react';
import styles from './ComntainerForm.module.css';

const TwoStageFormPopup = ({ isOpen, onClose, Hight , HeadName="dashbord" , children}) => {
  if (!isOpen) return null;

  return (
    <div id={styles["popup-overlay"]}>
      <div className={styles["popup-content"]} style={{ height: Hight }}>
          <div className={styles.headOfResponsive}>
               <button onClick={onClose}>&lt;</button>
              <h1>{HeadName}</h1>
          </div>
          {children}
      </div>
    </div>
  );
};

export default TwoStageFormPopup;
