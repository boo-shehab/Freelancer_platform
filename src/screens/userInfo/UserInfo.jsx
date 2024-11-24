import { useState, useEffect } from "react";
import CustomButton from "../../components/customButton/CustomButton";
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        password: "",
        email: "",
        name: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [id]: value,
        }));
    };

    useEffect(() => {
        let emailError = "";
        let passwordError = "";

        if (userInfo.email) {
            emailError = emailRegex.test(userInfo.email)
                ? ""
                : "Please enter a valid email address.";
        }

        if (userInfo.password) {
            passwordError =
                userInfo.password.length >= 8
                    ? ""
                    : "Password must be at least 8 characters long.";
        }

        setErrors({
            email: emailError,
            password: passwordError,
        });

        setIsDisabled(
            !(
                userInfo.name &&
                emailRegex.test(userInfo.email) &&
                userInfo.password.length >= 8
            )
        );
    }, [userInfo]);

    const handleUserInfo = () => {
        const storedData = JSON.parse(localStorage.getItem("userInfo"));

        const newData = storedData || {};
        newData.userInfo = {
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
        };

        localStorage.setItem("userInfo", JSON.stringify(newData));
        navigate("/");
        console.log("User Info Submitted:", newData);
    };

    return (
        <>
            <RegisterContainer>
                <div className={styles.userInfoContainer}>
                    <div className={styles.steps}>
                        <span className={styles.done}></span>
                        <span className={styles.done}></span>
                        <span className={styles.done}></span>
                    </div>
                    <div>
                        <h1>Enter Your Information</h1>
                        <p>
                            Please enter your personal information to complete
                            the registration process.
                        </p>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.type}>
                            <label htmlFor="name">
                                <p>Name</p>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label htmlFor="email">
                                <p>Email</p>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Enter your Email Address"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <p className={styles.error}>{errors.email}</p>
                                )}
                            </label>
                            <label htmlFor="password">
                                <p>Password</p>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={userInfo.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <p className={styles.error}>{errors.password}</p>
                                )}
                            </label>
                        </div>
                        <CustomButton
                            onClick={handleUserInfo}
                            disabled={isDisabled}
                        >
                            Complete Registration
                        </CustomButton>
                    </div>
                </div>
            </RegisterContainer>
        </>
    );
};

export default UserInfo;
