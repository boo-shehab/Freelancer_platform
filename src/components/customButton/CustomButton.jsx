import styles from "./CustomButton.module.css";
const CustomButton = ({ onClick, disabled, className = "", children , Width ="100%"}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.customButton} ${className}`}
      style={{width: Width }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
