import styles from "./card.module.css";

const Card = ({ children, marginTop = 0, paddingx = 16, marginbottom = 0,isProfilePage=false }) => {
  return (
    <div
      className={isProfilePage? styles.nonCard:styles.card}
      style={{
        marginTop,
        paddingLeft: paddingx,
        paddingRight: paddingx,
        marginBottom: marginbottom,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
