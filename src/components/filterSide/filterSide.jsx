import React from "react";
import styles from "./filterSide.module.css";
const filterSide = ({children ,selectedJobs}) => {
  return (
    <>
      <div className={styles.filterFreeLanceSide}>{children}</div>
    </>
  );
};
export default filterSide;
