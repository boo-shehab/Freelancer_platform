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
import fetchData from "../../utility/fetchData";
import useUserinfoStore from "../../useUserinfoStore";



const optionOfFreelancing = [
  {
    id: 1,
    Job: "fullstack",
  },
  {
    id: 2,
    Job: "frontend ",
  },
  {
    id: 3,
    Job: "mobile",
  },
  {
    id: 4,
    Job: "uiux",
  },
  {
    id: 5,
    Job: "backend",
  },
];

// const formerCoworkers = [
//   {
//     id: 1,
//     img: "./avatar.png",
//     name: "Zena Saad",
//     time: "2 months ago",
//     rate: "8.0",
//   },
//   {
//     id: 2,
//     img: "./avatar.png",
//     name: "Zena Saad",
//     time: "2 months ago",
//     rate: "6.0",
//   },
//   {
//     id: 3,
//     img: "./avatar.png",
//     name: "Zena Saad",
//     time: "2 months ago",
//     rate: "5.0",
//   },
//   {
//     id: 4,
//     img: "./avatar.png",
//     name: "Zena Saad",
//     time: "2 months ago",
//     rate: "9.0",
//   },
//   {
//     id: 5,
//     img: "./avatar.png",
//     name: "Zena Saad",
//     time: "2 months ago",
//     rate: "8.0",
//   },
// ];

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [recentProjects, setRecentProjects]= useState([])
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recentProjectOpened, setRecentProjectOpened] = useState(-1);
  const { isFreelancer, name, profilePicture } = useUserinfoStore()
  const [formerCoworkers, setFormerCoworkers] = useState([]);
  const [priceRage, setPriceRage] = useState(["minimum", "maximum"])
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [callBack, setCallBack] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const { about, projects} = useUserinfoStore();
  const [aboutState, setAboutState] = useState(about.slice(0, 200));
  const [dotsAbout, setDotsAbout] = useState("....");
  const [seeAction, setSeeAction] = useState("See More");
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

  const getProject = async () => {
    try {
        let response = '';
        if(isFreelancer) {
          const queryParams = selectedJobs
            .map((qualification) => `specializations=${qualification}`)
            .join("&");
            
          response = await fetchData(
            `projects/freelancer-feed?page=0&pageSize=10&${queryParams}${priceRage[1] > 0? `&MinPrice=${priceRage[0]}&MaxPrice=${priceRage[1]}` : ''}`,
            {
              method: "GET",
            }
          );
        } else {
          const queryParams = selectedJobs
            .map((qualification) => `qualificationNames=${qualification}`)
            .join("&");
          response = await fetchData(
            `projects/client-feed?page=0&pageSize=10&${queryParams}`,
            {
              method: "GET",
            }
          );
        }
      setPosts(response.results.result);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePriceFilter = () => {

  }

  const getFormerCoworkers = async() => {
    try{
      const response = await fetchData('clients/freelancers-worked-with?page=0&pageSize=5', {
        method: 'GET'
      });
      setFormerCoworkers(response.results.result)
      console.log('freelancers worked with:', response.results.result);
      
    }catch(e) {
      console.log('freelancers worked with:',e);
    }
  }

  const handleSeeMore = () => {
    if (about.length < 200) {
      setDotsAbout("");
      setSeeAction("");
      setAboutState(about);
    } else if (dotsAbout === "...." && seeAction === "See More") {
      setAboutState(about);
      setDotsAbout("");
      setSeeAction("Show Less");
    } else {
      setAboutState(about.slice(0, 200));
      setDotsAbout("....");
      setSeeAction("See More");
    }
  };

  useEffect(() => {
    setAboutState(about.slice(0, 200));
    handleSeeMore();
  }, [about]);

  useEffect(() => {
    const getRecentProjects = async() => {
      try{
        const response = await fetchData(
          `clients/recent-projects?page=0&pageSize=4`,
          {
            method: "GET",
          }
        );
        setRecentProjects(response.results.result);
      }catch(e) {
        console.log(e);
        
      }
    }
    if(!isFreelancer) {
      getRecentProjects()
      getFormerCoworkers()
    }
  }, [isFreelancer])

  useEffect(() => {
    getProject();
  }, [selectedJobs, isFreelancer]);

  const handleNewProject = () => {
    setIsPopupOpen(true);
  };
  const callBackFun = (CB) => {
    setCallBack(CB.selectedJobs);
    const values = CB.selectedJobs.map(item => item.value);
    console.log('values', values);
    console.log('CB', CB.selectedJobs)
    setSelectedJobs(values);
    setPriceRage(CB.price)

  };
  
  const formattedDate = (dataDate) => {
    const date = new Date(dataDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
    
  }

  return (
    <div style={styles.homeScreen}>
      <TwoStageFormPopup
        refresh={() => getProject()}
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
                            selectedJobs.includes(job.Job)
                              ? styles.btnGreen
                              : ""
                          }
                          `}
                          onClick={() => handleJobSelection(job.Job)}
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
          {isFreelancer}
          {isFreelancer ? (
            <FreeLancerScreen
              isPopupOpen2={isPopupOpen2}
              setIsPopupOpen2={setIsPopupOpen2}
              result={callBackFun}
            />
          ) : (
            <section className={styles.section1}>
              <Card>
                <div className={styles.userInfo}>
                  <img src={profilePicture} />
                  <p className={styles.name}>{name}</p>
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
                            selectedJobs.includes(job.Job)
                              ? styles.btnGreen
                              : ""
                          }
                          `}
                            onClick={() => handleJobSelection(job.Job)}
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
                    {aboutState}
                    {dotsAbout}{" "}
                    <span
                      className={styles.seeMoreAbout}
                      onClick={handleSeeMore}
                    >
                      {seeAction}
                    </span>
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
                        <small>{formattedDate(p.startDate)} - {p.endDate? formattedDate(p.startDate): 'present'}</small>
                        <p className={styles.itemDesc}>{p.description}</p>
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
            {isFreelancer ? (
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
                        <div>{i.label}</div>
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
                      <input
                        className={styles.moblieInput}
                        type="text"
                        placeholder="search"
                      />
                    </div>
                    <div
                      className={styles.filterBtn}
                      onClick={() => setOpenDrawer(true)}
                    >
                      <FilterMoboIcon />
                    </div>
                  </div>
                </div>
                <div className={styles.postBoxCont}>
                  <Card>
                    <div className={styles.postBox}>
                      <img src={profilePicture} />
                      <div
                        className={styles.postInput}
                        onClick={handleNewProject}
                      >
                        <p className={styles.postInputHint}>
                          {name} Let’s Create a Project !
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
                key={post.id}
                post={post}
              />
            ))}
          </section>
          {!isFreelancer && (
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
                            <b>{recentProject.title}</b>
                            <br />
                            <small>{recentProject.budget}</small>
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
                        {recentProject.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card marginTop={16}>
                <div className={styles.formerCoworkers}>
                  <div className={styles.formerCoworkersHead}>
                    <b className={styles.formerCoworkersTitle}>
                      Freelancers You Worked With
                    </b>
                    <a className={styles.more}>See All</a>
                  </div>
                  {formerCoworkers.map((coWorker) => (
                    <div key={coWorker.id} className={styles.coWorkerItem}>
                      <div className={styles.coWorkerInfo}>
                        <img src={coWorker.profilePicture} alt="" />
                        <div>
                          <b>{coWorker.name}</b>
                          <br />
                          <small>{formattedDate(coWorker.lastWorkDate)}</small>
                        </div>
                      </div>
                      <div className={styles.rate}>
                        <StarIcon /> <span>{coWorker.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}
        </div>
      </Container>
      <EditAboutPopup
        isOpen={isAboutPopupOpen}
        onClose={() => setIsAboutPopupOpen(false)}
        initialData={about}
      />
    </div>
  );
};

export default HomeScreen;
