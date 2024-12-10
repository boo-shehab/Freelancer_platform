import styles from "./CustomButton.module.css";
const CustomButton = ({ onClick, disabled, className = "", children , Width ="100%" , Display = true}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.customButton} ${className}`}
      style={{width: Width , display: Display ? "block" : "none"}}
    >
      {children}
    </button>
  );
};

export default CustomButton;
