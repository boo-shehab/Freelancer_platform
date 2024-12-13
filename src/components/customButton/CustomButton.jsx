import SvgComponent from "../../CustomIcons/Spinner";
import styles from "./CustomButton.module.css";
const CustomButton = ({ onClick, disabled, className = "", children , Width ="100%" , Display = true, isLoading = false}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.customButton} ${className}`}
      style={{width: Width , display: Display ? "flex" : "none"}}
    >
      {isLoading && 
        <SvgComponent color="#3c97af"/>
      }
      {children}
    </button>
  );
};

export default CustomButton;
