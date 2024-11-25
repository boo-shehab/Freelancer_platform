import styles from "./card.module.css";

const Card = ({ children, marginTop = 0 }) => {
  return (
    <div className={styles.card} style={{ marginTop }}>
      {children}
    </div>
  );
};

export default Card;
