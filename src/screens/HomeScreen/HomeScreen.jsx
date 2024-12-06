import { useState } from "react";
import Card from "../../components/Card/card";
import Container from "../../components/Container/container";
import ArrowTop from "../../CustomIcons/ArrowTop";
import EditIcon from "../../CustomIcons/EditIcon";
import Pluse2Icon from "../../CustomIcons/Pluse2Icon";
import PlusIcon from "../../CustomIcons/PlusIcon";
import StarIcon from "../../CustomIcons/StarIcon";
import styles from "./homeScreen.module.css";
import TwoStageFormPopup from "../../components/TwoStageFormPopup/TwoStageFormPopup";
import { Link } from "react-router-dom";
import ProjectPost from "../../components/ProjectPost/ProjectPost";
import FreeLancerScreen from "../freeLancerScreen/freeLancerScreen";

const projects = [
  {
    id: 1,
    title: "Project Name One",
    createdAt: "22 Jan 2024 - 11 May  2024.",
    desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
  },
  {
    id: 2,
    title: "Project Name Two",
    createdAt: "22 Jan 2024 - 11 May  2024.",
    desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
  },
];

const posts = [
  {
    id: 1,
    title: "Looking for Full-Sack Developer with experience +2 years",
    desc: "to build a responsive, user-focused web application. Must be skilled in both front-end and back-end development",
    duration: "4 Months",
    image: "/post.png",
    price: 50,
    client: {
      name: "Client Name",
      createdAt: "Posted 2 hours ago  ",
    },
  },
  {
    id: 2,
    title: "Looking for Full-Sack Developer with experience +2 years",
    desc: "to build a responsive, user-focused web application. Must be skilled in both front-end and back-end development",
    duration: "4 Months",
    price: 50,
    client: {
      name: "Client Name",
      createdAt: "Posted 2 hours ago  ",
    },
  },
];

const recentProjects = [
  {
    id: 1,
    projectName: "Web Design Project",
    projectPrice: "10$/Hour",
    projectDescription:
      "This Project Involves implementing both frontend and back-end functionalities ,as  well as integrating with third-party Apls.",
  },
  {
    id: 2,
    projectName: "Web Design Project",
    projectPrice: "10$/Hour",
    projectDescription:
      "This Project Involves implementing both frontend and back-end functionalities ,as  well as integrating with third-party Apls.",
  },
  {
    id: 3,
    projectName: "Web Design Project",
    projectPrice: "10$/Hour",
    projectDescription:
      "This Project Involves implementing both frontend and back-end functionalities ,as  well as integrating with third-party Apls.",
  },
];

const formerCoworkers = [
  {
    id: 1,
    img: "./avatar.png",
    name: "Zena Saad",
    time: "2 months ago",
    rate: "8.0",
  },
  {
    id: 2,
    img: "./avatar.png",
    name: "Zena Saad",
    time: "2 months ago",
    rate: "6.0",
  },
  {
    id: 3,
    img: "./avatar.png",
    name: "Zena Saad",
    time: "2 months ago",
    rate: "5.0",
  },
  {
    id: 4,
    img: "./avatar.png",
    name: "Zena Saad",
    time: "2 months ago",
    rate: "9.0",
  },
  {
    id: 5,
    img: "./avatar.png",
    name: "Zena Saad",
    time: "2 months ago",
    rate: "8.0",
  },
];

const HomeScreen = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recentProjectOpened, setRecentProjectOpened] = useState(-1);
  const [isClint, setIsClint] = useState(false);
  const [isFreeLancer, setIsFreeLancer] = useState(true);
  const handleNewProject = () => {
    setIsPopupOpen(true);
  };
  return (
    <div style={styles.homeScreen}>
      <TwoStageFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <Container>
        <div className={styles.content}>
          {/* MuhammedLami */}
          {isFreeLancer && <FreeLancerScreen />}
          {/* MuhammedLami */}

          {isClint && (
            <section className={styles.section1}>
              <Card>
                <div className={styles.userInfo}>
                  <img src="/avatar.png" />
                  <p className={styles.name}>Mustafa Emad</p>
                  <div className={styles.rate}>
                    <StarIcon /> <span>5.0</span>
                  </div>
                  <Link to="/profile">Edit Profile</Link>
                </div>
              </Card>
              <Card marginTop={16}>
                <div className={styles.about}>
                  <div className={styles.aboutHead}>
                    <b>About</b>
                    <EditIcon />
                  </div>
                  <p>
                    GreenTech Solutions Inc. Renewable Energy & Technology San
                    Francisco, California, with operations in North America and
                    Europe
                  </p>
                </div>
              </Card>
              <Card marginTop={16}>
                <div className={styles.history}>
                  <div className={styles.historyHead}>
                    <b>Projects History</b>
                    <div className={styles.actions}>
                      <PlusIcon />
                      <EditIcon />
                    </div>
                  </div>
                  {projects?.map((p) => (
                    <div className={styles.projectItem} key={p.id}>
                      <div className={styles.guid}>
                        <div className={styles.dot}></div>
                        <div className={styles.line}></div>
                      </div>
                      <div className={styles.itemInfo}>
                        <h4>{p.title}</h4>
                        <small>{p.createdAt}</small>
                        <p className={styles.itemDesc}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}

          <section className={styles.section2}>
            <Card>
              <div className={styles.postBox}>
                <img src="/avatar.png" />
                <div className={styles.postInput} onClick={handleNewProject}>
                  <p className={styles.postInputHint}>
                    Mustafa Let’s Create a Project !
                  </p>
                  <button className={styles.addBtn}>
                    <Pluse2Icon />
                  </button>
                </div>
              </div>
            </Card>
            {posts?.map((post) => (
              <ProjectPost key={post.id} post={post} />
            ))}
          </section>
          {isClint && (
            <section className={styles.section3}>
              <Card>
                <div className={styles.recent}>
                  <div className={styles.recentHead}>
                    <b className={styles.recentTitle}>Your Recent Project</b>
                    <a className={styles.more}>see all projects</a>
                  </div>
                  {recentProjects.map((recentProject) => (
                    <div
                      key={recentProject.id}
                      className={`${styles.recentItem} ${
                        recentProjectOpened === recentProject.id &&
                        styles.active
                      }`}
                    >
                      <div className={styles.recentHead}>
                        <div className={styles.recentItemInfo}>
                          <div className={styles.recentItemAvatar}></div>
                          <div>
                            <b>{recentProject.projectName}</b>
                            <br />
                            <small>{recentProject.projectPrice}</small>
                          </div>
                        </div>

                        <button
                          className={`${styles.arrowBtn} ${
                            recentProjectOpened === recentProject.id &&
                            styles.active
                          }`}
                          onClick={() =>
                            recentProjectOpened === -1 ||
                            recentProjectOpened !== recentProject.id
                              ? setRecentProjectOpened(recentProject.id)
                              : setRecentProjectOpened(-1)
                          }
                        >
                          <ArrowTop />
                        </button>
                      </div>
                      <p className={styles.projectDescription}>
                        {recentProject.projectDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card marginTop={16}>
                <div className={styles.formerCoworkers}>
                  <div className={styles.formerCoworkersHead}>
                    <b className={styles.formerCoworkersTitle}>
                      Your Recent Project
                    </b>
                    <a className={styles.more}>See All</a>
                  </div>
                  {formerCoworkers.map((coWorker) => (
                    <div key={coWorker.id} className={styles.coWorkerItem}>
                      <div className={styles.coWorkerInfo}>
                        <img src={coWorker.img} alt="" />
                        <div>
                          <b>{coWorker.name}</b>
                          <br />
                          <small>{coWorker.time}</small>
                        </div>
                      </div>
                      <div className={styles.rate}>
                        <StarIcon /> <span>{coWorker.rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HomeScreen;
