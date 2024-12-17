import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useState } from "react";
import SearchIcon from "../../CustomIcons/SearchIcon";
import BellIcon from "../../CustomIcons/BellIcon";
import Container from "../Container/container";
import HomeIcon from "../../CustomIcons/HomeIcon";
import DashBord from "../../CustomIcons/DashBord";
import ProfileIcon from "../../CustomIcons/ProfileIcon";
import SettingIcon from "../../CustomIcons/SettingIcon";
import InsertPostIcon from "../../CustomIcons/InsertPostIcon";
import TwoStageFormPopup from "../TwoStageFormPopup/TwoStageFormPopup";
import useUserinfoStore from "../../useUserinfoStore";

const Header = ({ image = "none", name = "none", type = "none" }) => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [newNotification, setNewNotification] = useState(true);
  const { isFreelancer } = useUserinfoStore()
  const [currecntPageNumber, setcurrecntPageNumber] = useState(1);

  const todayNotifications = [
    {
      img: "./avatar.png",
      name: "Zainab Saad",
      type: "comment on your project",
      time: "2h",
    },
    {
      img: "./avatar.png",
      name: "Zainab Saad",
      type: "comment on your project",
      time: "2h",
    },
    {
      img: "./avatar.png",
      name: "Zainab Saad",
      type: "comment on your project",
      time: "2h",
    },
  ];
  const thisWeekNotifications = [
    {
      img: "./avatar.png",
      name: "Zainab Saad",
      type: "comment on your project",
      time: "2d",
    },
    {
      img: "./avatar.png",
      name: "Zainab Saad",
      type: "comment on your project",
      time: "2d",
    },
    {
      img: "./avatar.png",
      name: "Zainab Saad",
      type: "comment on your project",
      time: "2d",
    },
  ];
  const openNotification = () => {
    setIsOpenNotification(!isOpenNotification);
    setNewNotification(false);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.header}>
      <TwoStageFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <Container>
        <div className={styles.content}>
          {/* the code of mobile ; */}
          <div className={styles.mobileTitle}>
            <h1 style={{ display: image === "none" ? "block" : "none" }}>
              {location.pathname.startsWith("/")
                ? location.pathname.slice(1)
                : location.pathname}
            </h1>
            <div
              style={{ display: image === "none" ? "none" : "flex" }}
              className={styles.infoUserTitle}
            >
              <div>
                <img src={image} alt="" />
              </div>
              <div className={styles.userData}>
                <p>{name}</p>
                <small>{type}</small>
              </div>
            </div>
          </div>
          {/* /////////////////////////////////// */}
          <NavLink to="/" className={styles.logo}>
            Freelancer platform
          </NavLink>
          <nav className={styles["nav-menu"]}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/setting">Settings</NavLink>
          </nav>
          <div className={styles["nav-bar"]}>
            <div className={styles.search}>
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </div>
            <button
              onClick={openNotification}
              className={`${newNotification ? styles["have-messages"] : ""}`}
            >
              {/* <img src={`${isOpenNotification? 'notification-active.png': './notification.png'}`} alt="" /> */}
              <BellIcon active={isOpenNotification} />            </button>

              {isOpenNotification && (
                <div className={styles.notifications}>
                  <div className={styles.notificationsTitle}>
                    <button onClick={openNotification}>&lt;</button>
                    <h3>Notification</h3>
                  </div>
                  <p className={styles.subTitle}>
                    You Have 3 <span>Notification</span> Today !
                  </p>
                  <ul>
                    <p
                      style={{ fontSize: "18px", padding: "16px 0px 0px 0px" }}
                    >
                      Today
                    </p>
                    {todayNotifications.map((today) => (
                      <li key={today.name}>
                        <span className={styles.marker}></span>
                        <div>
                          <img src={today.img} alt="" />
                          <p>
                            <span style={{ color: "#3C97AF" }}>
                              {today.name}
                            </span>{" "}
                            {today.type}{" "}
                            <span style={{ color: "#999999" }}>
                              {today.time}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <p
                      style={{ fontSize: "18px", padding: "16px 0px 0px 0px" }}
                    >
                      this week
                    </p>
                    {thisWeekNotifications.map((today) => (
                      <li
                        key={today.name}
                        style={{ border: "none", padding: "12px 0px" }}
                      >
                        <div>
                          <img src={today.img} alt="" />
                          <p>
                            <span style={{ color: "#3C97AF" }}>
                              {today.name}
                            </span>{" "}
                            {today.type}{" "}
                            <span style={{ color: "#999999" }}>
                              {today.time}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </Container>
      <div className={isFreelancer ? styles.footerOPtionFreelancer : styles.footerOPtion}>
        <div className={styles.option1} style={{ display: isFreelancer ? "none" : "block" }}>
          <NavLink onClick={() => setcurrecntPageNumber(1)} to="/">
            {" "}
            <HomeIcon color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(2)} to="/dashboard">
            {" "}
            <DashBord color={currecntPageNumber} />{" "}
          </NavLink>
        </div>
        <div className={styles.insertPostIcon} style={{ display: isFreelancer ? "none" : "block" }}>
          {" "}
          <button onClick={() => setIsPopupOpen(true)}>
            <InsertPostIcon />{" "}
          </button>
        </div>
        <div className={styles.option2} style={{ display: isFreelancer ? "none" : "block" }}>
          <NavLink onClick={() => setcurrecntPageNumber(3)} to="/profile">
            {" "}
            <ProfileIcon color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(4)} to="/setting">
            {" "}
            <SettingIcon color={currecntPageNumber} />{" "}
          </NavLink>
        </div>
        <div className={styles.freeLancerFooter} style={{ display: isFreelancer ? "flex" : "none" }}>
          <NavLink onClick={() => setcurrecntPageNumber(1)} to="/">
            {" "}
            <HomeIcon color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(2)} to="/dashboard">
            {" "}
            <DashBord color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(3)} to="/profile">
            {" "}
            <ProfileIcon color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(4)} to="/setting">
            {" "}
            <SettingIcon color={currecntPageNumber} />{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Header;
