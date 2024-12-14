import React from "react";
import ContainerForm from "../ContainerForm/ContainerForm";
import styles from "./DeleteComponent.module.css";

const DeleteComponent = ({ isOpen, onClose, HeadText, message, onDelete }) => {
  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <ContainerForm
      isOpen={isOpen}
      onClose={onClose}
      HeadName={HeadText ? HeadText : "Delete"}
    >
      <div >
        <div className={styles.modalHeader}>
          <h3>{message}</h3>
        </div>
        <div className={styles.btnCont}>
          <button className={styles.deleteBtn} onClick={onDelete}>
            Delete
          </button>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </ContainerForm>
  );
};

export default DeleteComponent;
