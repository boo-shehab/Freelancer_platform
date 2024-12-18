import React, { useState, useEffect } from "react";
import Card from "../Card/card";
import PlusIcon from "../../CustomIcons/PlusIcon";
import EditIcon from "../../CustomIcons/EditIcon";
import UsersIcone from "../../CustomIcons/UsersIcon";
import Styles from "./skils.module.css";
import MicrosoftIcon from "../../CustomIcons/MicrosoftIcon";
import SkillsForm from "../SkillsForm/SkillsForm";
import DeleteIcon from "../../CustomIcons/DeleteIcon";
import DeleteComponent from "../../components/DeleteComponent/DeleteComponent";
import FetchData from "../../utility/fetchData";
import CoursesAndCertificationsForm from "../../components/CoursesAndCertificationsForm/CoursesAndCertificationsForm";

const Skils = () => {
  const [isSkillsFormOpen, setIsSkillsFormOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [urlapi, seturlapi] = useState("");
  const [messageDelete, setmessageDelete] = useState("");
  const [name, setname] = useState("");
  const [skills, setSkillsvalue] = useState([]);
  const [certifications, setCertifications] = useState([]);

  function ShowDelete(message, urlapi) {
    setmessageDelete(message);
    setshowDelete(true);
    seturlapi(urlapi);
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
  /// select skills
  const getAllSkills = async (id) => {
    try {
      const data = await FetchData(
        `skills/${id}/skills?pageSize=100`,
        {
          method: "GET",
        },
        {
          "Content-Type": "application/json",
        }
      );
      if (data.isSuccess) {
        setSkillsvalue(data.results.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCertifications = async (id) => {
    try {
      const data = await FetchData(
        `freelancers/${id}/certifications`,
        {
          method: "GET",
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(data.results.result);
      setCertifications(data.results.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSkills(localStorage.getItem("id"));
    getAllCertifications(localStorage.getItem("id"));
  }, []);

  return (
    <div className={Styles.skilsCard}>
      <SkillsForm
        isOpen={isSkillsFormOpen}
        onClose={() => setIsSkillsFormOpen(false)}
        GetAllSkills={(id) => getAllSkills(id)}
      />
      <Card>
        <div className={Styles.skilsHead}>
          <h4 className={Styles.skilsTitil}> Skils</h4>
          <div className={Styles.actions}>
            <PlusIcon onClick={() => setIsSkillsFormOpen(true)} />
          </div>
        </div>
        <div className={Styles.skilsList}>
          {skills.map((sk) => (
            <div className={Styles.displayTHeSkills}>
              <div className={Styles.skillItem} key={sk.id}>
                <UsersIcone /> <p>{sk.name}</p>
              </div>
              <div className={Styles.skilssAction}>
                {/* <EditIcon onClick={() => setIsSkillsFormOpen(true)} /> */}
                <DeleteIcon
                  onClick={() =>
                    ShowDelete(
                      "Are you sure u want to delete this skill",
                      `skills/${sk.id}`
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className={Styles.skilsbody}>
        <Card>
          <CoursesAndCertificationsForm
            isOpen={isCoursesOpen}
            onClose={() => setIsCoursesOpen(false)}
          />
          <div className={Styles.skilsHead}>
            <h4 className={Styles.skilsTitil}> Courses & Certifications</h4>
            <div className={Styles.actions}>
              <PlusIcon onClick={() => setIsCoursesOpen(true)} />
            </div>
          </div>
          <ul>
            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <li key={cert.id}>
                  <div className={Styles.Item}>
                  
                      <div className={Styles.itemBox}>
                      <MicrosoftIcon />
                      <p>{cert.name || "No name available"}</p>
                      </div>
                    <div className={Styles.deleteIcon}>
                      <DeleteIcon
                        onClick={() =>
                          ShowDelete(
                            "Are you sure you want to delete this certification?",
                            `certifications/${cert.id}`
                          )
                        }
                      />
                    </div>
                   
                  </div>
                  
                  <div className={Styles.subItem}>
                    <small>{cert.issuer || "No issuer available"}</small>
                    <small>
                      {cert.issueDate
                        ? new Date(cert.issueDate).toLocaleDateString()
                        : "No date available"}
                    </small>
                  </div>
                </li>
              ))
            ) : (
              <p>No certifications available.</p>
            )}
          </ul>
        </Card>
      </div>
      <DeleteComponent
        message={messageDelete}
        isOpen={showDelete}
        onClose={() => setshowDelete(false)}
        TypeofDelete={urlapi}
        GetAllSkills={(id) => getAllSkills(id)}
      />
    </div>
  );
};
export default Skils;
