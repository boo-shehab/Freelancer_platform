import { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import Container from "../../components/Container/container";
import ArrowTop from "../../CustomIcons/ArrowTop";
import EditIcon from "../../CustomIcons/EditIcon";
import Pluse2Icon from "../../CustomIcons/Pluse2Icon";
import PlusIcon from "../../CustomIcons/PlusIcon";
import StarIcon from "../../CustomIcons/StarIcon";
import SearchIcon from "../../CustomIcons/SearchIcon";
import styles from "./homeScreen.module.css";
import TwoStageFormPopup from "../../components/TwoStageFormPopup/TwoStageFormPopup";
import { Link } from "react-router-dom";
import ProjectPost from "../../components/ProjectPost/ProjectPost";
import FreeLancerScreen from "../freeLancerScreen/freeLancerScreen";
import FilterResponsive from "../../CustomIcons/filterResponsive";
import { useMediaQuery } from "react-responsive";
import CommentForm from "../../components/CommentForm/CommentForm";
import MobileDrawer from "../../components/MobileDrawer/MobileDrawer";
import CloseIcon from "../../CustomIcons/CloseIcon";
import FilterMoboIcon from "../../CustomIcons/FilterMoboIcon";
import WorkForForm from "../../components/WorkForForm/WorkForForm";
import EditAboutPopup from "../../components/EditAboutPopup/EditAboutPopup";
import fetchData from '../../utility/fetchData'
import useUserinfoStore from "../../useUserinfoStore";

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

// const posts = [
//   {
//     id: 1,
//     title: "Looking for Full-Sack Developer with experience +2 years",
//     desc: "to build a responsive, user-focused web application. Must be skilled in both front-end and back-end development",
//     duration: "4 Months",
//     image: "/post.png",
//     price: 50,
//     client: {
//       name: "Client Name",
//       createdAt: "Posted 2 hours ago  ",
//     },
//   },
//   {
//     id: 2,
//     title: "Looking for Full-Sack Developer with experience +2 years",
//     desc: "to build a responsive, user-focused web application. Must be skilled in both front-end and back-end development",
//     duration: "4 Months",
//     price: 50,
//     client: {
//       name: "Client Name",
//       createdAt: "Posted 2 hours ago  ",
//     },
//   },
// ];

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
// const WorkFor = [
//   {
//     id: 1,
//     title: "company Name One",
//     createdAt: "22 Jan 2024 - 11 May  2024.",
//     desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
//   },
//   {
//     id: 2,
//     title: "company Name Two",
//     createdAt: "22 Jan 2024 - 11 May  2024.",
//     desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
//   },
// ];

const optionOfFreelancing = [
  {
    id: 1,
    Job: "Full-Stack",
  },
  {
    id: 2,
    Job: "Front End ",
  },
  {
    id: 3,
    Job: "Mobile Developer",
  },
  {
    id: 4,
    Job: "UI UX Designer",
  },
  {
    id: 5,
    Job: "Back End",
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
  const [posts, setPosts] = useState([])
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recentProjectOpened, setRecentProjectOpened] = useState(-1);
  const [isFreeLancer, setIsFreeLancer] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [callBack, setCallBack] = useState([]);
  const [isCommentForm, setIsCommentForm] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isWorkForOpen, setIsWorkForOpen] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false)  
  const { about } = useUserinfoStore();
  const drawerHeight = 500;

  const isSmallScreen = useMediaQuery({ query: "(max-width: 950px)" });
  const clearAllSelections = () => {
    setSelectedJobs([]);
  };

  const handleJobSelection = (jobId) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(jobId)
        ? prevSelected.filter((id) => id !== jobId)
        : [...prevSelected, jobId]
    );
  };

  const getProject = async() => {
    try{
      const response = await fetchData(`projects/client-feed?page=0&pageSize=1`, {
        method: 'GET',
      });
      console.log(response.results.result);
      setPosts(response.results.result);
    }catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getProject()
  }, [])

  const handleNewProject = () => {
    setIsPopupOpen(true);
  };
  const callBackFun = (CB) => {
    setCallBack(CB);
    console.log(CB);
  };

 
  return (
    <div style={styles.homeScreen} >
      <TwoStageFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <MobileDrawer
        height={drawerHeight}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className={styles.mobileDrawerCont}>
          <div className={styles.drwerTopLine}></div>
          <div className={styles.mobileDrawer}>
            <div className={styles.drawerHeadr}>
              <button
                onClick={() => setOpenDrawer(false)}
                className={styles.closeBtn}
              >
                <CloseIcon />
              </button>
              <h3>Filter Projects</h3>
              <gap></gap>
            </div>
            <div className={styles.filterCont}>
              <div className={styles.specializationFilter}>
                <div className={styles.specializationBody}>
                  <div className={styles.spacing}>
                    {optionOfFreelancing.map((job) => (
                      <div key={job.id} className={styles.Options}>
                        <button
                          className={`${styles.btn} 
                          ${
                            selectedJobs.includes(job.id) ? styles.btnGreen : ""
                          }
                          `}
                          onClick={() => handleJobSelection(job.id)}
                        ></button>
                        <p>{job.Job}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.drawerBtn}>
              <button
                onClick={() => setOpenDrawer(false)}
                className={styles.cancelSort}
              >
                Cancel Sort
              </button>
              <button className={styles.apply}>Apply</button>
            </div>
          </div>
        </div>
      </MobileDrawer>
      <Container>
        <div className={styles.content}>
          {/* MuhammedLami */}
          {isFreeLancer ? (
            <FreeLancerScreen
              isPopupOpen2={isPopupOpen2}
              setIsPopupOpen2={setIsPopupOpen2}
              result={callBackFun}
            />
          ) : (
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
                <div className={styles.freeLancerHeader}>
                  <h1 className={styles.filterHead}>Filter</h1>

                  <p className={styles.clearAll} onClick={clearAllSelections}>
                    Clear all
                  </p>
                </div>
                <div className={styles.specializationFilter}>
                  <h4 className={styles.specializationHead}>
                    specializationFilter
                  </h4>
                  <div className={styles.specializationBody}>
                    <div className={styles.spacing}>
                      {optionOfFreelancing.map((job) => (
                        <div key={job.id} className={styles.Options}>
                          <button
                            className={`${styles.btn} 
                          ${
                            selectedJobs.includes(job.id) ? styles.btnGreen : ""
                          }
                          `}
                            onClick={() => handleJobSelection(job.id)}
                          ></button>
                          <p>{job.Job}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              <Card marginTop={16}>
                <div className={styles.about}>
                  <div className={styles.aboutHead}>
                    <b>About</b>
                    <EditIcon onClick={() => setIsAboutPopupOpen(true)} />
                  </div>
                  <p>
                    {/* GreenTech Solutions Inc. Renewable Energy & Technology San
                    Francisco, California, with operations in North America and
                    Europe */}
                    {about}
                  </p>
                </div>
              </Card>
              <Card marginTop={16}>
                <div className={styles.history}>
                  <div className={styles.historyHead}>
                    <b>Projects History</b>
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
              {/* <Card marginTop={16}>
                <div className={styles.history}>
                  <WorkForForm
                    isOpen={isWorkForOpen}
                    onClose={() => setIsWorkForOpen(false)}
                  />
                  <div className={styles.historyHead}>
                    <b>Work For</b>
                    <div className={styles.actions}>
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
                  {WorkFor?.map((p) => (
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
              </Card> */}
            </section>
          )}
          <section
            className={styles.section2}
            style={{ marginBottom: `${isSmallScreen ? "130px" : "0px"}` }}
          >
            {isFreeLancer ? (
              <>
                <div className={styles.mainFreeLancerScreenSearch}>
                  <div className={styles.FreeLancerScreenSearch}>
                    <SearchIcon />
                    <input
                      className={styles.SearchInput}
                      placeholder="Search"
                      type="text"
                    />
                  </div>
                  <button className={styles.SearchBtn}>Search</button>
                  <button
                    className={styles.FilterResponsiveBtn}
                    onClick={() => setIsPopupOpen2(true)}
                  >
                    <FilterResponsive />
                  </button>
                </div>
                <div className={styles.showingUp}>
                  {callBack.map((i) => (
                    <>
                      <div className={styles.insideShowingUp}>
                        <div>x</div>
                        <div>{i}</div>
                      </div>
                    </>
                  ))}{" "}
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className={styles.mobileSearch}>
                    <div className={styles.mobileInputForm}>
                      <SearchIcon />
                      <input className={styles.moblieInput} type="text" placeholder="search" />
                    </div>
                    <div className={styles.filterBtn} onClick={() => setOpenDrawer(true)}><FilterMoboIcon /></div>
                  </div>
                </div>
                <div className={styles.postBoxCont}>
                  <Card>
                    <div className={styles.postBox}>
                      <img src="/avatar.png" />
                      <div
                        className={styles.postInput}
                        onClick={handleNewProject}
                      >
                        <p className={styles.postInputHint}>
                          Mustafa Let’s Create a Project !
                        </p>
                        <button className={styles.addBtn}>
                          <Pluse2Icon />
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
            {posts?.map((post) => (
              <ProjectPost
                isFreeLancer={isFreeLancer}
                IsCommentForm={isCommentForm}
                SetIsCommentForm={() => setIsCommentForm(!isCommentForm)}
                key={post.id}
                post={post}
              />
            ))}
          </section>
          {!isFreeLancer && (
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
                          <div className={styles.ArrowTop}>
                            <ArrowTop />{" "}
                          </div>
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
      <CommentForm
        isOpen={isCommentForm}
        onClose={() => setIsCommentForm(!isCommentForm)}
      />
      <EditAboutPopup
        isOpen={isAboutPopupOpen}
        onClose={() => setIsAboutPopupOpen(false)}
      />
    </div>
  );
};

export default HomeScreen;
