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
import FetchData from "../../utility/fetchData";
import dayjs from "dayjs";


function ProfileLeft1({ userId }) {
  const [profile, setProfile] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
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

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function ShowDelete(message , deleteId) {
    setDeleteId(deleteId);
    setMessageDelete(message);
    setShowDelete(true);
  }

  const getEducation = async (url, setter) => {
    try {
      const data = await FetchData(
        `freelancers/${localStorage.getItem("id")}/education?page=0&pageSize=100`,
        {
          method: "GET",
        }
      );
      console.log(data);
      setEducation(data.results.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGet2 = async (url, setter) => {
    try {
      const data = await FetchData(
       url,
        {
          method: "GET",
        }
      );
      setProfile(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet2( `profiles/${localStorage.getItem('id')}` ,setProfile );
    getEducation();
    console.log("setter \n opsajc \n osajflc" , profile);

  }, []);
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
            <img className={styles.selfie} src={profile?.profilePicture || "/avatar.png"} alt="Profile" />
            <div className={styles.nameSpecialization}>
              <p className={styles.name}>{profile?.name}</p>
              <p className={styles.specialization}>{profile?.username}</p>
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
                {profile?.about}
              </span>
              {/* <button
                className={styles.seeMoreButton}
                onClick={handleToggleExpand}
              >
                {isExpanded ? "See Less" : "See More"}
              </button> */}
            </p>
          </div>
        </div>
      </Card>
      {/* Education Section */}

      {/* EducationForm */}

      <Card marginTop={10}>
        <EducationForm
          isOpen={isEducationOpen}
          onClose={() => setIsEducationOpen(false)}
          GetEducations = {getEducation}
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
        
          {education?.map((edu, index) => {
            const startDate = dayjs(edu.startDate);
            const endDate = dayjs(edu.endDate);

            // Calculate months and days difference
            const months = endDate.diff(startDate, "month");
            const remainingDays = endDate
              .subtract(months, "month")
              .diff(startDate, "day");

            return (
              <div key={index} className={styles.box3Part2}>
                <div className={styles.boxInfo}>
                <div className={styles.img}>
                  <img
                    className={styles.universityIcon}
                    src={UniversityIcon}
                    alt="University"
                  />
                </div>
                <div className={styles.educationDetails}>
                  <div className={styles.titleOfEducation}>
                    <p className={styles.university}>{edu.institution}</p>
                 
                  </div>

                  <p className={styles.date}>
                    {startDate.format("DD MMM YYYY")} -{" "}
                    {endDate.format("DD MMM YYYY")}
                  </p>
                  <p className={styles.duration}>
                    {months} mos {remainingDays} days
                  </p>
                  <p className={styles.college}>{edu.degree}</p>
                </div>
                </div>
                <div className={styles.educationAction}>
                      <button
                        className={styles.edit}
                        onClick={() => setIsEducationOpen(true)}
                      >
                        <EditIcon />
                      </button>
                      <button onClick={ () => ShowDelete("Are you sure u want to delete this Education", parseInt(edu.id ,10))}>
                        <DeleteIcon />
                      </button>
                    </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card marginTop={10}>
        {/* <ProjectHistoryForm
          isOpen={isProjectHistoryOpen}
          onClose={() => setIsProjectHistoryOpen(false)}
        /> */}
        <div className={styles.box4}>
          <div className={styles.projectAddEdit}>
            <p>Projects History</p>
          </div>
          {projects.map((project, index) => (
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

                    <button
                      onClick={() =>
                        ShowDelete(
                          "Are you sure u want to delete this Work kExperience" , 0
                        )
                      }
                    >
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

      {/* <Card marginTop={10}>
        <WorkForForm
          isOpen={isWorkForOpen}
          onClose={() => setIsWorkForOpen(false)}
        />
        <div className={styles.box4}>
          <div className={styles.workForAddEdit}>
            <p>Work For</p>
            <div className={styles.button}>
              <button
                className={styles.add}
                onclick={() => {
                  console.log(isWorkForOpen);

                  setIsWorkForOpen(true);
                }}
              >
                <PlusIcon
                  onClick={() => setIsWorkForOpen(true)}
                />
              </button>
              <button
                className={styles.edit}
                onClick={() => setIsWorkForOpen(true)}
              >
                <EditIcon />
              </button>
            </div>
          </div>

          {WorkFor?.map((workFor, index) => (
            <div key={index} className={styles.workForItem} >
              {index > 0 && <div className={styles.line}></div>}
              <div className={styles.box4Part2}>
              <div className={styles.box4Part2Part1}>
                  <div className={styles.circle}></div>
                  <div className={styles.line1}></div>
                  <div className={styles.circle}></div>
                </div>
                <div className={styles.workForDetails}>
                  <p className={styles.workForName}>{workFor.name}</p>
                  <p className={styles.date}>{workFor.date}</p>
                  <p className={styles.duration}>{workFor.duration}</p>
                  <p className={styles.description}>{workFor.description}</p>
                </div>
              </div>
            </div>
          ))}


        </div>
      </Card> */}
      <DeleteComponent
        isOpen={showDelete}
        message={messageDelete}
        onClose={() => setShowDelete(false)}
        TypeofDelete={`freelancers/education/${deleteId}`}
        GetAllData={getEducation}
      />
    </div>
  );
}

export default ProfileLeft1;
