import React, { useState } from "react";
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";
import "react-phone-number-input/style.css";
import styles from "./login.module.css";
import CustomButton from "../../components/customButton/CustomButton";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const isFormValid = phoneNumber.length === 10 && password.length >= 8;

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/web/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: phoneNumber,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }
  
      const data = await response.json();
        console.log("Login successful:", data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    }
  };
  

  return (
    <>
      <RegisterContainer>
        <div className={styles["Account-type"]}>
          <div className={styles.loginHeader}>
            <h1>Login to get started!</h1>
            <p>Enter your Freelancing Hub information!</p>
          </div>
          <div className={styles.form}>
            <div className={styles.LoginForm}>
              <p>Phone number</p>
              <input
                type="text"
                className={phoneNumber.length === 10 ? styles.activeinput : ""}
                placeholder="Enter Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p>Password</p>
              <input
                className={password.length >= 8 ? styles.activeinput : ""}
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <CustomButton 
              onClick={handleLogin}
              // disabled={!isFormValid}
            >
              Login &gt;
            </CustomButton>
          </div>
        </div>
      </RegisterContainer>
    </>
  );
};

export default Login;
