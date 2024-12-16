import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterContainer from "../../components/RegisterContainer/RegisterContainer";
import "react-phone-number-input/style.css";
import styles from "./register.module.css";
import PhoneNumberInput from "../../components/PhoneNumberInput/PhoneNumberInput";
import OtpComponent from "../../components/OtpComponent/OtpComponent";
import CustomButton from "../../components/customButton/CustomButton";
import UserIcon from "../../CustomIcons/UserIcon";
import UserSearchIcon from "../../CustomIcons/UserSearchIcon";
import UserInfo from "../userInfo/UserInfo";
import fetchData from "../../utility/fetchData";

const Register = () => {
  const [accountType, setAccountType] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [stage, setStage] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handlePhoneNumber = (phone) => {
    setPhoneNumber(phone);
    setStage(3);
  };

  const handleOTP = () => {
    console.log('otp next stage:');
    
    setStage(4)
    // navigate("/user-info");
  };

  const sendData = async(data) => {
    console.log(data);
    
    setIsLoading(true)
    const bodyData = {
      "name": data.name,
      "email": data.email,
      "phoneNumber": phoneNumber,
      "password": data.password,
      "userType": accountType,
    }

    if(accountType === 'client') {
      bodyData['companyName'] = data.companyName;
    }
    
    try {
      await fetchData("auth/complete-registration", { 
        method: "POST", 
        body: JSON.stringify(bodyData)}, {'Content-Type': 'application/json'})
        navigate('/login')
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    {stage <= 3? (
      <RegisterContainer>
        <div className={styles["Account-type"]}>
          <div className={styles.steps}>
            <span className={styles.done}></span>
            <span
              className={`${
                stage === 2
                  ? styles["half-done"]
                  : stage === 3
                  ? styles.done
                  : ""
              }`}
            ></span>
            <span></span>
          </div>
          <div>
            {stage === 1 ? (
              <>
                <h1>Let’s Get started!</h1>
                <p>How do you plan to use this platform</p>
              </>
            ) : (
              <>
                <h1>Enter Your Phone Number</h1>
                <p>
                  Enter your phone number to verify your identity and the
                  validity of your number to safely activate your account on the
                  platform.
                </p>
              </>
            )}
          </div>
          <div className={styles.form}>
            {stage === 1 && (
              <>
                <div className={styles.type}>
                  <label
                    onClick={() => setAccountType("freelancer")}
                    className={`${accountType === "freelancer" ? styles.active : ""}`}
                  >
                    <UserIcon color={accountType === "freelancer" ? "#3C97AF" : "black"} />
                    <div>
                      <h2>freelance</h2>
                      <p>I’m a freelancer ready to work for projects</p>
                    </div>
                    <input
                      type="type"
                      name="type"
                      id="freelance"
                      value={"freelancer"}
                      style={{ display: "none" }}
                    />
                  </label>

                  <label
                    onClick={() => setAccountType("client")}
                    className={`${accountType === "client" ? styles.active : ""}`}
                  >
                    <UserSearchIcon
                      color={accountType === "client" ? "#3C97AF" : "black"}
                    />
                    <div className="">
                      <h2>client</h2>
                      <p>I’m a freelancer ready to work for projects</p>
                    </div>

                    <input
                      type="type"
                      name="type"
                      id="client"
                      value={"client"}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                <CustomButton
                  onClick={() => {
                    setStage(2);
                  }}
                  disabled={accountType === null}
                >
                  next &gt;
                </CustomButton>
              </>
            )}

            {stage === 2 && (
              <PhoneNumberInput
                handleNext={(phone) => handlePhoneNumber(phone)}
              />
            )}
            {stage === 3 && <OtpComponent handleNext={() => handleOTP()} phone={phoneNumber} />}
          </div>
        </div>
      </RegisterContainer>
    ) : (
      <UserInfo data={(data) => sendData(data)} isLoading={isLoading} isClient={accountType === 'client'} />
    )}
    </>
  );
};

export default Register;
