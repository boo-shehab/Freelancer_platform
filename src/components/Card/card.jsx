import styles from "./card.module.css";

const Card = ({ children, marginTop = 0, paddingx = 16 ,marginbottom=0}) => {
  return (
    <div
      className={styles.card}
      style={{ marginTop, paddingLeft: paddingx, paddingRight: paddingx ,marginBottom:marginbottom}}
    >
      {children}
    </div>
  );
};

export default Card;
