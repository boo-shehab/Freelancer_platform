import React from "react";
import styles from "./filterSide.module.css";
const filterSide = ({children}) => {
  return (
    <>
      <div className={styles.filterFreeLanceSide}>{children}</div>
    </>
  );
};

export default filterSide;
