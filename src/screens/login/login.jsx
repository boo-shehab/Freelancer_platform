import React, { useState } from "react";
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";
import "react-phone-number-input/style.css";
import styles from "./login.module.css";
import CustomButton from "../../components/customButton/CustomButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isFormValid = phoneNumber.length === 10 && password.length >= 8;

  return (
    <>
      <RegisterContainer>
        <div className={styles["Account-type"]}>
          <div className={styles.steps}>
            <span className={styles.done}></span>
            <span className={styles.done}></span>
            <span className={styles.done}></span>
          </div>
          <div>
            <h1>Let’s Get Login!</h1>
            <p>Enter your information</p>
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
            <CustomButton
              onClick={() => {
                navigate("/");
              }}
              disabled={!isFormValid}
            >
              Open &gt;
            </CustomButton>
          </div>
        </div>
      </RegisterContainer>
    </>
  );
};

export default Login;
