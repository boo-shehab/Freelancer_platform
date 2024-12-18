import React, { useState, useEffect } from "react";
import styles from "./profileLeft1.module.css";
import UniversityIcon from "./university.png";
import Card from "../Card/card";
import EditAboutPopup from "../EditAboutPopup/EditAboutPopup";
import WorkExperienceForm from "../WorkExperienceForm/WorkExperienceForm";
import EducationForm from "../EducationForm/EducationForm";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditProfileImagePopup  from "../EditProfilePopup/EditProfileImagePopup";
import WorkForForm from "../WorkForForm/WorkForForm";
import EditIcon from "../../CustomIcons/EditIcon";
import PlusIcon from "../../CustomIcons/PlusIcon";
import DeleteIcon from "../../CustomIcons/DeleteIcon";
import DeleteComponent from "../../components/DeleteComponent/DeleteComponent";
import FetchData from "../../utility/fetchData";
import dayjs from "dayjs";
import useUserinfoStore from "../../useUserinfoStore";



function ProfileLeft1({ userId }) {
  const [profile, setProfile] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [education, setEducation] = useState([]);
  const [deleteType, setDeleteType] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateimage, setUpdateimage] = useState(false);
  const [isAboutFormOpen, setIsAboutFormOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isWorkExperienceOpen, setIsWorkExperienceOpen] = useState(false);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [isProjectHistoryOpen, setIsProjectHistoryOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [messageDelete, setMessageDelete] = useState("");
  const { projects } = useUserinfoStore();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function ShowDelete(message, deleteId , deleteType) {
    setDeleteId(deleteId);
    setMessageDelete(message);
    setDeleteType(deleteType)
    setShowDelete(true);
  }

  const getEducation = async () => {
    try {
      const data = await FetchData(
        `freelancers/${localStorage.getItem("id")}/education?page=0&pageSize=100`,
        {
          method: "GET",
        }
      );
      setEducation(data.results.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getWorkExpe = async () => {
    try {
      const data = await FetchData(
        `freelancers/${localStorage.getItem("id")}/work-experience?page=0&pageSize=100`,
        {
          method: "GET",
        }
      );
      setWorkExperience(data.results.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const data = await FetchData(
        `profiles/${localStorage.getItem('id')}`,
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
    getProfile();
    getEducation();
    getWorkExpe();
  }, []);
  return (
    <div className={styles.container}>

      <Card>
      <EditProfilePopup
          isOpen={isProfileFormOpen}
          onClose={() => setIsProfileFormOpen(false)}
          initialData={{ name: profile.name, specialization: profile.qualificationName }}
          getData={getProfile}
       />
       <EditProfileImagePopup
          isOpen={updateimage}
          onClose={() => setUpdateimage(false)}
          initialData={{ image : profile.profilePicture }}
          getData={getProfile}
       />

        <div className={styles.box1}>
          <div className={styles.part1PictureName}>
            <img className={styles.selfie} src={profile?.profilePicture || "/avatar.png"} alt="Profile" onClick={() => setUpdateimage(true)} />
            <div className={styles.nameSpecialization}>
              <p className={styles.name}>{profile?.name}</p>
              <p className={styles.specialization}>{profile?.qualificationName}</p>
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
          initialData={profile?.about}
          getData={getProfile}
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
          GetEducations={getEducation}
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
                  {/* <button
                    className={styles.edit}
                    onClick={() => setIsEducationOpen(true)}
                  >
                    <EditIcon />
                  </button> */}
                  <button onClick={() => ShowDelete("Are you sure u want to delete this Education", parseInt(edu.id, 10), "Education")}>
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
      <div className={styles.history}>
                    <div className={styles.historyHead}>
                      <b>Projects History</b>
                    </div>
                    {projects?.map((p) => {
                      const startDateOfProject = new Date(p.startDate);
                      const endDateOfProject = new Date(p.endDate);
                      return (
                      <div className={styles.projectItem} key={p.id}>
                        <div className={styles.guid}>
                          <div className={styles.dot}></div>
                          <div className={styles.line}></div>
                        </div>
                        <div className={styles.itemInfo}>
                          <h4>{p.title}</h4>
                          <small>
                              {`${startDateOfProject.getFullYear()}-${String(startDateOfProject.getMonth() + 1).padStart(2, '0')}-${String(startDateOfProject.getDate()).padStart(2, '0')}`}
                              {` to ${endDateOfProject.getFullYear()}-${String(endDateOfProject.getMonth() + 1).padStart(2, '0')}-${String(endDateOfProject.getDate()).padStart(2, '0')}`}
                          </small>
                          <p className={styles.itemDesc}>{p.description}</p>
                        </div>
                      </div>
                    )})}
                  </div>
      </Card>

      {/* Work Experience Section */}
      <Card marginTop={10}>
        <WorkExperienceForm
          isOpen={isWorkExperienceOpen}
          onClose={() => setIsWorkExperienceOpen(false)}
          GetDate={getWorkExpe}
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
          {workExperience?.map((work, index) => {
  const startDatevalue = new Date(work.startDate);
  const endDatevalue = new Date(work.endDate);

  return (
    <div key={index} className={styles.workContainer}>
      {index > 0 && <div className={styles.line}></div>}
      <div className={styles.workDetails}>
        <div className={styles.titleWorkDetails}>
          <p className={styles.workName}>{work.employerName}</p>
          <div className={styles.workAction}>
            {/* <button onClick={() => setIsWorkExperienceOpen(true)}>
              <EditIcon />
            </button> */}

            <button
              onClick={() =>
                ShowDelete(
                  "Are you sure you want to delete this Work Experience",
                  work.id , "WorkExperience"
                )
              }
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        <p className={styles.date}>
        {`${startDatevalue.getFullYear()}-${String(startDatevalue.getMonth() + 1).padStart(2, '0')}-${String(startDatevalue.getDate()).padStart(2, '0')}`}
          {work.endDate
            ? ` to ${endDatevalue.getFullYear()}-${String(endDatevalue.getMonth() + 1).padStart(2, '0')}-${String(endDatevalue.getDate()).padStart(2, '0')}`
            : ""}        </p>
        <p className={styles.duration}>{work.jobTitle}</p>
        <p className={styles.description}>{work.employmentType}</p>
      </div>
    </div>
  );
})}

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
        TypeofDelete={deleteType === "WorkExperience" ? `freelancers/work-experience/${deleteId}` : `freelancers/education/${deleteId}`}
        GetAllData={deleteType === "WorkExperience" ? getWorkExpe : getEducation}
      />
    </div>
  );
}

export default ProfileLeft1;
