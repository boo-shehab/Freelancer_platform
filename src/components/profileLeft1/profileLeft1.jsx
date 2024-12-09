import React, { useState } from "react";
import styles from "./profileLeft1.module.css";
import EditIcon from "./edit-02.png";
import AddIcon from "./add.png";
import UniversityIcon from "./university.png";
import SelfieImage from "./Ellipse.png";
import Card from "../Card/card"
const userData = {
  profile: {
    name: "Abdullah Ali",
    specialization: "Full-Stack Developer",
    selfie: SelfieImage,
  },
  about: {
    text: "As a dedicated software developer with a passion for clean code and efficient problem-solving, I thrive on creating robust applications that improve user experience and drive business goals. My expertise lies in backend development, database management, and scalable architecture. I am always eager to learn new technologies and stay updated with the latest trends in the tech world. I believe in the power of collaboration and enjoy working in teams to achieve project goals.",
  },
  education: [
    {
      university: "University of Baghdad",
      date: "22 Jan 2023 - 11 May 2032",
      duration: "3 mos 20 days",
      college: "Information & Communication Engineering, Al-Khwarizmi College",
    },
  ],
  projects: [
    {
      name: "project Name",
      date: "22 Jan 2023 - 11 May 2032",
      description: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently.",
    },
    {
      name: "project Name",
      date: "01 June 2022 - 20 Oct 2023",
      description: "Built an e-commerce platform with features such as product listing, cart, checkout, and payment gateway integration.",
    }
  ],
  workExperience: [
    {
      name: "project Name",
      date: "01 Feb 2020 - 01 Jan 2023",
      description: "Worked on building scalable web applications and improving user interface designs for various clients.",
    },
    {
      name: "project Name",
      date: "01 Mar 2018 - 01 Jan 2020",
      description: "Focused on frontend development using React.js, HTML, CSS, and JavaScript to enhance user experience.",
    }
  ],
};

function ProfileLeft1() {
  const { profile, about, education, projects, workExperience } = userData;

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      {/* Profile Section */}
      <Card>
        <div className={styles.box1}>
          <img className={styles.selfie} src={profile.selfie} alt="Profile" />
          <div className={styles.nameSpecialization}>
            <p className={styles.name}>{profile.name}</p>
            <p className={styles.specialization}>{profile.specialization}</p>
          </div>
          <button className={styles.edit}>
            <img className={styles.editIcon} src={EditIcon} alt="Edit" />
          </button>
        </div>
      </Card>

      <Card marginTop={10}>
        <div className={styles.box2About}>
          <div className={styles.aboutEdit}>
            <p className={styles.about}>About</p>
            <button className={styles.edit}>
              <img className={styles.editIcon} src={EditIcon} alt="Edit" />
            </button>
          </div>
          <div className={styles.descriptionAbout}>
            <p>
              <span className={isExpanded ? styles.expandedText : styles.collapsedText}>
                {about.text}
              </span>
              <button className={styles.seeMoreButton} onClick={handleToggleExpand}>
                {isExpanded ? "See Less" : "See More"}
              </button>
            </p>
          </div>
        </div>
      </Card>

      <Card marginTop={10}>
        <div className={styles.box3}>
          <div className={styles.educationAddEdit}>
            <p>Education</p>
            <div className={styles.button}>
              <button className={styles.add}>
                <img className={styles.addIcon} src={AddIcon} alt="Add" />
              </button>
              <button className={styles.edit}>
                <img className={styles.editIcon} src={EditIcon} alt="Edit" />
              </button>
            </div>
          </div>
          {education.map((edu, index) => (
            <div key={index} className={styles.box3Part2}>
              <div className={styles.img}>
                <img className={styles.universityIcon} src={UniversityIcon} alt="University" />
              </div>
              <div className={styles.educationDetails}>
                <p className={styles.university}>{edu.university}</p>
                <p className={styles.date}>{edu.date}</p>
                <p className={styles.duration}>{edu.duration}</p>
                <p className={styles.college}>{edu.college}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card marginTop={10}>
        <div className={styles.box4}>
          <div className={styles.projectAddEdit}>
            <p>Projects History</p>
            <div className={styles.button}>
              <button className={styles.add}>
                <img className={styles.addIcon} src={AddIcon} alt="Add" />
              </button>
              <button className={styles.edit}>
                <img className={styles.editIcon} src={EditIcon} alt="Edit" />
              </button>
            </div>
          </div>

          {projects.map((project, index) => (
            <div className={styles.box4Part2}>
              <div className={styles.box4Part2Part1}>

                <div className={styles.circle}></div>
                <div className={styles.line1}></div>
                <div className={styles.circle}></div>
              </div>
              <div key={index} className={styles.projectContainer}>
                {index > 0 && <div className={styles.line}></div>}
                <div className={styles.projectDetails}>
                  <p className={styles.projectName}>{project.name}</p>
                  <p className={styles.date}>{project.date}</p>
                  <p className={styles.description}>{project.description}</p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </Card >
      <Card marginTop={10} >
        <div className={styles.box4}>
          <div className={styles.workAddEdit}>
            <p>Work Experience</p>
            <div className={styles.button}>
              <button className={styles.add}>
                <img className={styles.addIcon} src={AddIcon} alt="Add" />
              </button>
              <button className={styles.edit}>
                <img className={styles.editIcon} src={EditIcon} alt="Edit" />
              </button>
            </div>
          </div>
          {workExperience.map((work, index) => (
            <div key={index} className={styles.workContainer}>
              {index > 0 && <div className={styles.line}></div>}
              <div className={styles.workDetails}>
                <p className={styles.workName}>{work.name}</p>
                <p className={styles.date}>{work.date}</p>
                <p className={styles.description}>{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default ProfileLeft1;
