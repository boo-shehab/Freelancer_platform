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
 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };



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
            <div className={styles.done}></div>
            <div className={styles.done}></div>
            <div className={styles.DoneAnimate}></div>
          </div>
          <div>
            <h1>Enter Your Information</h1>
            <p>
              Please enter your personal information to complete the
              registration process.
            </p>
          </div>
          <div className={styles.form}>
            <div className={styles.type}>
              <label htmlFor="name">
                <p>Name</p>
                <input className={styles.inputForm}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </label>
              <label htmlFor="email">
                <p>Email</p>
                <input className={styles.inputForm}
                  type="text"
                  id="email"
                  placeholder="Enter your Email Address"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
                
              </label>
              <label htmlFor="password">
                <p>Password</p>
                <input className={styles.inputForm}
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={userInfo.password}
                  onChange={handleInputChange}
                />
             
              </label>
            </div>
            <CustomButton onClick={handleUserInfo} disabled={isDisabled}>
              Complete Registration
            </CustomButton>
          </div>
        </div>
      </RegisterContainer>
    </>
  );
};

export default UserInfo;
