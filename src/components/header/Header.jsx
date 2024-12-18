import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
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
import fetchData from "../../utility/fetchData";
import { useSignalR } from "../../utility/signelR";
import dayjs from "dayjs";

const Header = ({ image = "none", name = "none", type = "none" }) => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [newNotification, setNewNotification] = useState(true);
  const { isFreelancer } = useUserinfoStore();
  const [currecntPageNumber, setcurrecntPageNumber] = useState(1);
  const jwtToken = localStorage.getItem("accessToken");
  const { notifications } = useSignalR(jwtToken);

  useEffect(() => {
    console.log("All notifications:", notifications);
    // Perform actions with the notifications here
  }, [notifications]);

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

  const fetchNotifications = async () => {
    const processedRatings = {
      averageRating: parseFloat(results.averageRating, 10),
      totalRating: results.totalRating,
      highRating: results.highRating,
      midRating: results.midRating,
      lowRating: results.lowRating,
    };
  };

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
              <BellIcon active={isOpenNotification} />{" "}
            </button>

            {isOpenNotification && (
              <div className={styles.notifications}>
                <div className={styles.notificationsTitle}>
                  <button onClick={openNotification}>&lt;</button>
                  <h3>Notification</h3>
                </div>
                <p className={styles.subTitle}>
                  {notifications.length === 0
                    ? "No Notification"
                    : `You Have ${notifications.length} Notification
                  Today !`}
                </p>
                <ul>
                  {notifications.length === 0 ? null : (
                    <p
                      style={{ fontSize: "18px", padding: "16px 0px 0px 0px" }}
                    >
                      Today
                    </p>
                  )}

                  {notifications.map((notification, index) => (
                    <li key={index}>
                      <span className={styles.marker}></span>
                      <div >
                        <img className={styles.notiPic}
                          src={notification.data.image}
                          alt={notification.data.likerName}
                        />
                        <p>
                          <span style={{ color: "#3C97AF" }}>
                            {notification.data.likerName}
                          </span>{" "}
                          {notification.data.message}{" "}
                          <br />
                          <span style={{ color: "#999999" }}>
                            {dayjs(notification.data.createdAt).format("HH:mm")}
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
      <div
        className={
          isFreelancer ? styles.footerOPtionFreelancer : styles.footerOPtion
        }
      >
        <div
          className={styles.option1}
          style={{ display: isFreelancer ? "none" : "block" }}
        >
          <NavLink onClick={() => setcurrecntPageNumber(1)} to="/">
            {" "}
            <HomeIcon color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(2)} to="/dashboard">
            {" "}
            <DashBord color={currecntPageNumber} />{" "}
          </NavLink>
        </div>
        <div
          className={styles.insertPostIcon}
          style={{ display: isFreelancer ? "none" : "block" }}
        >
          {" "}
          <button onClick={() => setIsPopupOpen(true)}>
            <InsertPostIcon />{" "}
          </button>
        </div>
        <div
          className={styles.option2}
          style={{ display: isFreelancer ? "none" : "block" }}
        >
          <NavLink onClick={() => setcurrecntPageNumber(3)} to="/profile">
            {" "}
            <ProfileIcon color={currecntPageNumber} />{" "}
          </NavLink>
          <NavLink onClick={() => setcurrecntPageNumber(4)} to="/setting">
            {" "}
            <SettingIcon color={currecntPageNumber} />{" "}
          </NavLink>
        </div>
        <div
          className={styles.freeLancerFooter}
          style={{ display: isFreelancer ? "flex" : "none" }}
        >
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
