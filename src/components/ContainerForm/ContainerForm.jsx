import { useEffect, useState } from 'react';
import styles from './ContainerForm.module.css';
import CloseIcon from '../../CustomIcons/CloseIcon';

const ContainerForm = ({ isOpen, onClose, Hight = 'auto' , HeadName="" , children}) => {
  if (!isOpen) return null;

  return (
    <div id={styles["popup-overlay"]}>
      <div className={styles["popup-content"]} style={{ height: Hight }}>
          <div className={styles.headOfResponsive}>
               <button onClick={onClose} className={styles.mobileClose}>&lt;</button>
              <h1>{HeadName}</h1>
              <button onClick={onClose} className={styles.webClose}><CloseIcon /></button>
          </div>
          {children}
      </div>
    </div>
  );
};

export default ContainerForm;
