import { Link, NavLink } from "react-router-dom";
import styles from './Header.module.css';
import { useState } from "react";
import SearchIcon from "../../CustomIcons/SearchIcon";
import BellIcon from "../../CustomIcons/BellIcon";
import Container from "../Container/container";
const Header = () => {
    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [newNotification, setNewNotification] = useState(true)
    const todayNotifications = [
        {
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2h'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2h'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2h'
        }
    ]
    const thisWeekNotifications = [
        {
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2d'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2d'
        },{
            img: './avatar.png',
            name: 'Zainab Saad',
            type: 'comment on your project',
            time: '2d'
        }
    ]
    const openNotification = () => {
        setIsOpenNotification(!isOpenNotification);
        setNewNotification(false);
    }

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.content}>
                    <NavLink to="/" className={styles.logo}>Freelancer platform</NavLink>
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
                        <button onClick={openNotification} className={`${ newNotification? styles['have-messages'] : ''}`}>
                            {/* <img src={`${isOpenNotification? 'notification-active.png': './notification.png'}`} alt="" /> */}
                            <BellIcon active={isOpenNotification}/>
                            {isOpenNotification && (
                                <div className={styles.notifications}>
                                    <h3>Notification</h3>
                                    <p className={styles.subTitle}>You Have 3 <span>Notification</span> Today !</p>
                                    <ul>

                                        <p style={{fontSize: '18px', padding: '16px 0px 0px 0px'}}>Today</p>
                                        {todayNotifications.map((today) => (
                                            <li key={today.name}>
                                                <span className={styles.marker}></span>
                                                <div>
                                                    <img src={today.img} alt="" />
                                                    <p><span style={{color: '#3C97AF'}}>{today.name}</span> {today.type} <span style={{color: '#999999'}}>{today.time}</span></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul>

                                        <p style={{fontSize: '18px', padding: '16px 0px 0px 0px'}}>this week</p>
                                        {thisWeekNotifications.map((today) => (
                                            <li key={today.name} style={{border: 'none', padding: '12px 0px'}}>
                                                <div>
                                                    <img src={today.img} alt="" />
                                                    <p><span style={{color: '#3C97AF'}}>{today.name}</span> {today.type} <span style={{color: '#999999'}}>{today.time}</span></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Header;