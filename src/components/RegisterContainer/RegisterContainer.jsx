import VectorIcon from '../../CustomIcons/VectorIcon';
import styles from './registerContainer.module.css'
import { useState, useEffect } from "react";
const RegisterContainer = ({children}) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => {
          setCurrentPath(window.location.pathname);
        };
            window.addEventListener("popstate", handleLocationChange);
    
        return () => {
          window.removeEventListener("popstate", handleLocationChange);
        };
      }, []);

    return (
        <div className={styles["register-container"]}>
            <div className={styles.left}>
                <h1>Welcome to Your Freelancing Hub!</h1>
                <p>We’re thrilled to have you here! Whether you're a client searching for skilled freelancers to bring your projects to life or a freelancer eager to find exciting opportunities, this is the place where connections are made, and ideas come to reality. Let's start building something amazing together!</p>
                <div>
                    <VectorIcon />
                </div>
            </div>
            <div className={styles.right}>
                {children}
                {currentPath  === '/Login' ?    <p className={styles.loginLink}>Create new Acount ? <a href="register">register</a></p>
                                                       :    <p className={styles.loginLink}>you already have Acount ? <a href="Login">Login</a></p>
                }
              
            </div>
        </div>
    )
}

export default RegisterContainer;