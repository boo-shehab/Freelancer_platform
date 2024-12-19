import React from "react";
import ContainerForm from "../ContainerForm/ContainerForm";
import styles from "./DeleteComponent.module.css";
import FetchData from "../../utility/fetchData";

const DeleteComponent = ({
  isOpen,
  onClose,
  HeadText,
  message,
  TypeofDelete,
  GetAllData,
}) => {
  if (!isOpen) return null;

  const deleteItem = async () => {
    try {
      const data = await FetchData(
        TypeofDelete,
        {
          method: "DELETE",
        },
        {
          "Content-Type": "application/json",
        }
      );
      const id = localStorage.getItem("id");

      if (id && GetAllData) {
        GetAllData(id);
      } else if (GetAllData) {
        GetAllData();
      }
      onClose();
    } catch (error) {
      onClose();
    }
    onClose();
  };
  return (
    <ContainerForm
      isOpen={isOpen}
      onClose={onClose}
      HeadName={HeadText ? HeadText : "Delete"}
    >
      <div>
        <div className={styles.modalHeader}>
          <h3>{message}</h3>
        </div>
        <div className={styles.btnCont}>
          <button className={styles.deleteBtn} onClick={deleteItem}>
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
