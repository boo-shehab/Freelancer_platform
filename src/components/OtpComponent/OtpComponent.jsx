import { useEffect, useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';
import styles from './OtpComponent.module.css'
import './OtpComponent.css'
import CustomButton from '../customButton/CustomButton';
import Timer from '../../CustomIcons/Timer';
import fetchData from '../../utility/fetchData';

const OtpComponent = ({handleNext, phone}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleChange = (value) => {
    setOtp(value);
  };

  useEffect(() => {
    setIsValid(otp.length === 6);
  }, [otp]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResend = () => {
    setOtp(''); 
    setTimer(59);
    setIsResendDisabled(true);
    console.log('Resend OTP');
  };

  const handleOTP = async() => {
    setIsLoading(true)
    
    try {
      const data = await fetchData("auth/verify-phone-number", { 
        method: "POST", 
        body: JSON.stringify({phone, otp})})
        console.log('Submission response:', data);
        handleNext()
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles["otp-wrapper"]}>
      <div>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          
          separator={<span style={{ width: "10px" }}></span>}
          inputStyle="otp-input"
          isInputNum={true}
        />
        <div className={styles.timer}><Timer/> 00:{timer < 10 ? `0${timer}` : timer}</div>
        <p className={styles["resend-text"]}>
          Didn't receive a message?{' '}
          <span
            className={`${styles['resend-link']} ${isResendDisabled ? styles.disabled : ''}`}
            onClick={!isResendDisabled ? handleResend : null}
            style={{ color: isResendDisabled ? '#3c96af81' : '#3C97AF', cursor: isResendDisabled ? 'not-allowed' : 'pointer' }}
          >
            Resend
          </span>
        </p>
      </div>
      <CustomButton onClick={handleOTP} disabled={!isValid}>
        Verify
      </CustomButton>
    </div>
  );
};

export default OtpComponent;
