import styles from "./CustomButton.module.css";
const CustomButton = ({ onClick, disabled, className = "", children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.customButton} ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
