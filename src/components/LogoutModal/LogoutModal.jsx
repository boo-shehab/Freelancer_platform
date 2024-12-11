import styles from "./LogoutModal.module.css";

function LogoutModal({ isOpen, onClose, children }) {
  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        onClick={onClose}
      ></div>
      <div
        className={styles.content}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  )
}

export default LogoutModal