import React from 'react'
import styles from "./MobileDrawer.module.css";

function MobileDrawer({ isOpen, onClose, height = 280, children }) {
  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={onClose}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      ></div>
      <div
        className={styles.content}
        style={{ height, bottom: isOpen ? 0 : `-${height}px` }}
      >
        {children}
      </div>
    </div>
  )
}

export default MobileDrawer