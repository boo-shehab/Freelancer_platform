import styles from './CustomButton.module.css'
const CustomButton = ({onClick, disabled, className = '', style, children}) => {
    return (
        <button type="button" onClick={onClick} disabled={disabled} className={`${styles.customButton} ${className}`} style={style}>{children}</button>
    )
}

export default CustomButton;