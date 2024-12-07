import React from "react";
import Card from "../Card/card";
import PlusIcon from "../../CustomIcons/PlusIcon";
import EditIcon from "../../CustomIcons/EditIcon";
import UsersIcone from "../../CustomIcons/UsersIcon";
import Styles from "./skils.module.css";
import MicrosoftIcon from "../../CustomIcons/MicrosoftIcon";
const Skils = () => {
  const Courses = [
    {
      id: 1,
      title: "Microsoft 365 Certified: Fundamentals",
      date: "issued in 22 Jul 2024",
      desc: " Microsoft ",
    },
    {
      id: 2,
      title: "Microsoft 365 Certified: Fundamentals",
      date: "issued in 22 Jul 2024",
      desc: " Microsoft ",
    },
    {
      id: 3,
      title: "Microsoft 365 Certified: Fundamentals",
      date: "22 Jan 2024 - 11 May  2024.",
      desc: " Microsoft ",
    },
  ];
  return (
    <div className={Styles.skilsCard}>
      <Card>
        <div className={Styles.skilsHead}>
          <h4 className={Styles.skilsTitil}> Skils</h4>
          <div className={Styles.actions}>
            <PlusIcon />
            <EditIcon />
          </div>
        </div>
        <div className={Styles.skilsList}>
          <div className={Styles.skillItem}>
            <UsersIcone /> <p>Figma (Software)</p>
          </div>
          <div className={Styles.skillItem}>
            <UsersIcone /> <p>Adobe Illustrator (Software)</p>
          </div>
          <div className={Styles.skillItem}>
            <UsersIcone /> <p>Sketch (Software)</p>
          </div>
        </div>
      </Card>
      <div className={Styles.skilsbody}>
        <Card>
          <div className={Styles.skilsHead}>
            <h4 className={Styles.skilsTitil}> Courses & Certifications</h4>
            <div className={Styles.actions}>
              <PlusIcon />
              <EditIcon />
            </div>
          </div>
          <ul>
            {Courses.map((course) => (
              <li key={course.id}>
                <div className={Styles.Item}>
                  <MicrosoftIcon />
                  <p>{course.title}</p>
                </div>
                <div className={Styles.subItem}>
                  <small>{course.date}</small>
                  <small>{course.desc}</small>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
export default Skils;
