import React, { useState } from "react";
import Card from "../Card/card";
import PlusIcon from "../../CustomIcons/PlusIcon";
import EditIcon from "../../CustomIcons/EditIcon";
import UsersIcone from "../../CustomIcons/UsersIcon";
import Styles from "./skils.module.css";
import MicrosoftIcon from "../../CustomIcons/MicrosoftIcon";
import SkillsForm from "../SkillsForm/SkillsForm";
import CoursesAndCertificationsForm from "../CoursesAndCertificationsForm/CoursesAndCertificationsForm";
import DeleteIcon from "../../CustomIcons/DeleteIcon";
import DeleteComponent from "../../components/DeleteComponent/DeleteComponent"

const Skils = () => {
  const [isSkillsFormOpen, setIsSkillsFormOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [showDelete, setshowDelete] = useState(false)
  const [messageDelete, setmessageDelete] = useState("")

  function ShowDelete (message){
    setmessageDelete(message);
    setshowDelete(true)
  }
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

  const [Skills, setSkills] = useState(['Figma (Software)', 'Adobe Illustrator (Software)', 'Sketch (Software)'])
  return (
    <div className={Styles.skilsCard}>
      <SkillsForm isOpen={isSkillsFormOpen} onClose={() => setIsSkillsFormOpen(false)} initialData={Skills} onSave={(handleNewSkills) => { setSkills(handleNewSkills) }} />
      <Card>
        <div className={Styles.skilsHead}>
          <h4 className={Styles.skilsTitil}> Skils</h4>
          <div className={Styles.actions}>
            <PlusIcon onClick={() => setIsSkillsFormOpen(true)} />
          </div>
        </div>
        <div className={Styles.skilsList}>
          {Skills.map((skill) => (
            <div className={Styles.displayTHeSkills}>
              <div className={Styles.skillItem} key={skill}>
                <UsersIcone /> <p>{skill}</p>
              </div>
              <div className={Styles.skilssAction}>
                <EditIcon onClick={() => setIsSkillsFormOpen(true)} />
                <DeleteIcon onClick={()=> ShowDelete("Are you sure u want to delete this skill")} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className={Styles.skilsbody}>
        <Card>
          <CoursesAndCertificationsForm isOpen={isCoursesOpen} onClose={() => setIsCoursesOpen(false)} />
          <div className={Styles.skilsHead}>
            <h4 className={Styles.skilsTitil}> Courses & Certifications</h4>
            <div className={Styles.actions}>
              <PlusIcon onClick={() => (setIsCoursesOpen(true))} />
            </div>
          </div>
          <ul>
            {Courses.map((course) => (
              <li key={course.id}>
                <div className={Styles.Item}>
                 <div >
                  <MicrosoftIcon />
                  <p>{course.title}</p>
                 </div>
                 <div className={Styles.coursesAction}>
                <EditIcon onClick={() => setIsCoursesOpen(true)} />
                <DeleteIcon onClick={()=> ShowDelete("Are you sure u want to delete this skill")} />
                </div>
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
      <DeleteComponent message={messageDelete} isOpen={showDelete} onClose={ ()=> setshowDelete(false)}/>
    </div>
  );
};
export default Skils;
