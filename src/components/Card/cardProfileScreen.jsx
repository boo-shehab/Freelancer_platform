import React from "react";
import styles from "./card.module.css";

export default function CardProfileScreen({ children, marginTop = 0,marginBottom = 0}) {
  return (
    <div
      style={{ paddingRight: "24px", paddingLeft: "24px", marginTop ,marginBottom}}
      className={styles.card}
    >
      {children}
    </div>
  );
}
