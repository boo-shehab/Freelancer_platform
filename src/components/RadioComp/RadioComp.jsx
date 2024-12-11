import React from "react";
import styles from "./RadioComp.module.css";

function RadioComp({ value, onChange, checked, children }) {
    
  const handleClick = () => {
    onChange(value);  
  };

  return (
    <div className={styles.radio} onClick={handleClick}>
      <div
        className={styles.container}
        style={{
          border: checked ? "2px solid #3C97AF" : "2px solid #EBEBEB",
        }}
      >
        <div
          className={styles.toggle}
          style={{
            background: checked ? "#3C97AF" : "#fff",
            width: checked ? "100%" : "0",
            height: checked ? "100%" : "0",
          }}
        ></div>
      </div>
      <p>{children}</p>
    </div>
  );
}

export default RadioComp;
