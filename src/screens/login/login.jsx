import React, { useState } from "react";
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";
import "react-phone-number-input/style.css";
import styles from "./login.module.css";
import CustomButton from "../../components/customButton/CustomButton";
import { useNavigate } from "react-router-dom";
import FetchData from "../../utility/fetchData";
import useUserinfoStore from '../../useUserinfoStore';

const Login = () => {
  const { addUserInfo } = useUserinfoStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const data = await FetchData('auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email : email,
          password : password,
        }),
      }, {
        'Content-Type': 'application/json'
      });
        const { accessToken, userDetails } = data.results;
        const { id } = userDetails;
  
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('id', id);
        // setUsername(username);
        // setName(name);
        // setPhoneNumber(phoneNumber);
        // setIsFreelancer(role === "freelancer");
        // if(role === 'client') {
        //   setCompanyName()
        // }
        addUserInfo(userDetails)
        navigate('/');
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      setLoading(false);
    }
    setLoading(false);
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
              <p>Email</p>
              <input
                type="email"
                className={styles.activeinput}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>Password</p>
              <input
                className={password.length >= 6 ? styles.activeinput : ""}
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <h4 className={styles.error}>{errorMessage}</h4>}
            <CustomButton
              onClick={handleLogin}
              disabled={(!(password.length >= 6)) || (!validateEmail(email))}
            >
              {loading ? "loading . . . " : "Login >"}
            </CustomButton>
          </div>
        </div>
      </RegisterContainer>
    </>
  );
};

export default Login;
