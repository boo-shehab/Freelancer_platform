import { useEffect, useState } from 'react';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import styles from './phoneNumberInput.module.css';
import CustomButton from '../customButton/CustomButton';
import fetchData from '../../utility/fetchData';

const countries = [
  { value: '+964', label: 'Iraq', code: 'IQ' },
  { value: '+1', label: 'United States', code: 'US' },
  { value: '+44', label: 'United Kingdom', code: 'GB' },
  // Add more countries as needed
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 100,
    borderRadius: '8px 0 0 8px',
    padding: '0px 8px',
    border: 'none',
    boxShadow: 'none',
  }),
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const PhoneNumberInput = ({ handleNext }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState('');
  const [activePhone, setActivePhone] = useState(true);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  useEffect(() => {
    const phoneRegex = /^(\+964|964|0)?7(5[0-9]|7[0-9]|8[0-9])[0-9]{7}$/;
    setActivePhone(phoneRegex.test(phone));
  }, [phone]);

  const formatPhoneNumber = () => {
    const formattedPhone = phone.replace(/^(\+964|964|0)/, ''); 
    return `${selectedCountry.value}${formattedPhone}`;
  };

  const sendPhone = async(phoneNumber) => {
    setIsLoading(true)
    console.log(phoneNumber);
    
    try {
      const data = await fetchData("auth/send-verification-code", { 
        method: "POST", 
        body: JSON.stringify(phoneNumber)})
        console.log('Submission response:', data);
        handleNext(formatPhoneNumber())
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles['phone-container']}>
      <div className={styles["phone-input-wrapper"]}>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          options={countries.map((country) => ({
            value: country.value,
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  style={{
                    width: '20px',
                    height: '15px',
                    marginRight: '8px',
                  }}
                />
                {country.value}
              </div>
            ),
            code: country.code,
          }))}
          styles={customStyles}
          isSearchable={false}
        />
        <input
          type="text"
          className={styles["phone-number-input"]}
          placeholder="Enter Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <CustomButton
        onClick={() => sendPhone({ phoneNumber: formatPhoneNumber() })}
        disabled={!activePhone || isLoading}
        isLoading={isLoading}
      >
        Send verification code
      </CustomButton>
    </div>
  );
};

export default PhoneNumberInput;
