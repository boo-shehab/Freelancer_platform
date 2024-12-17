import React, { useState, useEffect } from "react";
import styles from "./profileLeft1.module.css";
import UniversityIcon from "./university.png";
import Card from "../Card/card";
import EditAboutPopup from "../EditAboutPopup/EditAboutPopup";
import WorkExperienceForm from "../WorkExperienceForm/WorkExperienceForm";
import EducationForm from "../EducationForm/EducationForm";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import WorkForForm from "../WorkForForm/WorkForForm";
import EditIcon from "../../CustomIcons/EditIcon";
import PlusIcon from "../../CustomIcons/PlusIcon";
import DeleteIcon from "../../CustomIcons/DeleteIcon";
import DeleteComponent from "../../components/DeleteComponent/DeleteComponent";

function ProfileLeft1({ userId }) {
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState(null);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAboutFormOpen, setIsAboutFormOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isWorkExperienceOpen, setIsWorkExperienceOpen] = useState(false);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [isProjectHistoryOpen, setIsProjectHistoryOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [messageDelete, setMessageDelete] = useState("");

  // Fetch user data from API
  useEffect(() => {
    // Fetch profile data
    fetch(`/api/web/v1/users/${userId}/profile`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile:", error));

    // Fetch about data
    fetch(`/api/web/v1/users/${userId}/about`)
      .then((response) => response.json())
      .then((data) => setAbout(data))
      .catch((error) => console.error("Error fetching about:", error));

    // Fetch education data
    fetch(`/api/web/v1/freelancers/${userId}/education`)
      .then((response) => response.json())
      .then((data) => setEducation(data))
      .catch((error) => console.error("Error fetching education:", error));

    // Fetch work experience data
    fetch(`/api/web/v1/freelancers/${userId}/certifications`)
      .then((response) => response.json())
      .then((data) => setWorkExperience(data))
      .catch((error) => console.error("Error fetching work experience:", error));

    // Fetch projects data
    fetch(`/api/web/v1/projects/freelancer-feed`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [userId]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function ShowDelete(message) {
    setMessageDelete(message);
    setShowDelete(true);
  }

  return (
    <div className={styles.container}>
      {/* Profile Section */}
      <Card>
        <EditProfilePopup
          isOpen={isProfileFormOpen}
          onClose={() => setIsProfileFormOpen(false)}
        />
        <div className={styles.box1}>
          <div className={styles.part1PictureName}>
            <img className={styles.selfie} src={profile?.selfie || "/avatar.png"} alt="Profile" />
            <div className={styles.nameSpecialization}>
              <p className={styles.name}>{profile?.name}</p>
              <p className={styles.specialization}>{profile?.specialization}</p>
            </div>
          </div>
          <button
            className={styles.edit}
            onClick={() => setIsProfileFormOpen(true)}
          >
            <EditIcon />
          </button>
        </div>
      </Card>

      {/* About Section */}
      <Card marginTop={10}>
        <EditAboutPopup
          isOpen={isAboutFormOpen}
          onClose={() => setIsAboutFormOpen(false)}
        />
        <div className={styles.box2About}>
          <div className={styles.aboutEdit}>
            <p className={styles.about}>About</p>
            <button
              className={styles.edit}
              onClick={() => setIsAboutFormOpen(true)}
            >
              <EditIcon />
            </button>
          </div>
          <div className={styles.descriptionAbout}>
            <p>
              <span
                className={
                  isExpanded ? styles.expandedText : styles.collapsedText
                }
              >
                {about?.text}
              </span>
              <button
                className={styles.seeMoreButton}
                onClick={handleToggleExpand}
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            </p>
          </div>
        </div>
      </Card>

      {/* Education Section */}
      <Card marginTop={10}>
        <EducationForm
          isOpen={isEducationOpen}
          onClose={() => setIsEducationOpen(false)}
        />
        <div className={styles.box3}>
          <div className={styles.educationAddEdit}>
            <p>Education</p>
            <div className={styles.button}>
              <button
                className={styles.add}
                onClick={() => setIsEducationOpen(true)}
              >
                <PlusIcon />
              </button>
            </div>
          </div>
          {education?.map((edu, index) => (
            <div key={index} className={styles.box3Part2}>
              <div className={styles.img}>
                <img
                  className={styles.universityIcon}
                  src={UniversityIcon}
                  alt="University"
                />
              </div>
              <div className={styles.educationDetails}>
                <div className={styles.titleOfEducation}>
                  <p className={styles.university}>{edu.university}</p>
                  <div className={styles.educationAction}>
                    <button
                      className={styles.edit}
                      onClick={() => setIsEducationOpen(true)}
                    >
                      <EditIcon />
                    </button>
                    <button onClick={() => ShowDelete("Are you sure you want to delete this Education")}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <p className={styles.date}>{edu.date}</p>
                <p className={styles.duration}>{edu.duration}</p>
                <p className={styles.college}>{edu.college}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Projects Section */}
      <Card marginTop={10}>
        <div className={styles.box4}>
          <div className={styles.projectAddEdit}>
            <p>Projects History</p>
          </div>
          {projects?.map((project, index) => (
            <div key={index} className={styles.postOfProject}>
              {index > 0 && <div className={styles.line}></div>}
              <div className={styles.box4Part2}>
                <div className={styles.box4Part2Part1}>
                  <div className={styles.circle}></div>
                  <div className={styles.line1}></div>
                  <div className={styles.circle}></div>
                </div>
                <div className={styles.projectDetails}>
                  <p className={styles.projectName}>{project.name}</p>
                  <p className={styles.date}>{project.date}</p>
                  <p className={styles.duration}>{project.duration}</p>
                  <p className={styles.description}>{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Work Experience Section */}
      <Card marginTop={10}>
        <WorkExperienceForm
          isOpen={isWorkExperienceOpen}
          onClose={() => setIsWorkExperienceOpen(false)}
        />
        <div className={styles.box4}>
          <div className={styles.workAddEdit}>
            <p>Work Experience</p>
            <div className={styles.button}>
              <button className={styles.add}>
                <PlusIcon onClick={() => setIsWorkExperienceOpen(true)} />
              </button>
            </div>
          </div>
          {workExperience?.map((work, index) => (
            <div key={index} className={styles.workContainer}>
              {index > 0 && <div className={styles.line}></div>}
              <div className={styles.workDetails}>
                <div className={styles.titleWorkDetails}>
                  <p className={styles.workName}>{work.name}</p>
                  <div className={styles.workAction}>
                    <button onClick={() => setIsWorkExperienceOpen(true)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => ShowDelete("Are you sure you want to delete this Work Experience")}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <p className={styles.date}>{work.date}</p>
                <p className={styles.duration}>{work.duration}</p>
                <p className={styles.description}>{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <DeleteComponent isOpen={showDelete} message={messageDelete} onClose={() => setShowDelete(false)} />
    </div>
  );
}

export default ProfileLeft1;
