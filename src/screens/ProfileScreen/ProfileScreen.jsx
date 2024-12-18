import Card from "../../components/Card/card";
import DonutChart from "../../components/charts/DonutChart";
import Container from "../../components/Container/container";
import CommentsIcon from "../../CustomIcons/CommentsIcon";
import EditIcon from "../../CustomIcons/EditIcon";
import HeartIcon from "../../CustomIcons/HeartIcon";
import MoreIcon from "../../CustomIcons/MoreIcon";
import PlusIcon from "../../CustomIcons/PlusIcon";
import UserIcon from "../../CustomIcons/UserIcon";
import TaskDoneIcon from "../../CustomIcons/TaskDoneIcon";
import styles from "./ProfileScreen.module.css";
import EmptyStarIcon from "../../CustomIcons/EmptyStarIcon";
import Star2Icon from "../../CustomIcons/Star2Icon";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import EditProfilePopup from "../../components/EditProfilePopup/EditProfilePopup";
import EditAboutPopup from "../../components/EditAboutPopup/EditAboutPopup";
import ProjectHistoryForm from "../../components/ProjectHistoryForm/ProjectHistoryForm";
import ProfileLeft1 from "../../components/profileLeft1/profileLeft1";
import SkilsSide from "../../components/Skils/skils";
// import WorkForForm from "../../components/WorkForForm/WorkForForm";
import DeleteComponent from "../../components/DeleteComponent/DeleteComponent";
import FetchData from "../../utility/fetchData";
import useUserinfoStore from "../../useUserinfoStore";
import ProjectPost from "../../components/ProjectPost/ProjectPost";
import TwoStageFormPopup from "../../components/TwoStageFormPopup/TwoStageFormPopup";
import BookWithPlus from "../../CustomIcons/bookWithPlus" 
const WorkFor = [
  {
    id: 1,
    title: "company Name One",
    createdAt: "22 Jan 2024 - 11 May  2024.",
    desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
  },
  {
    id: 2,
    title: "company Name Two",
    createdAt: "22 Jan 2024 - 11 May  2024.",
    desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
  },
];

const ProfileScreen = () => {
  const { about, projects } = useUserinfoStore();

  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const [isWorkForOpen, setIsWorkForOpen] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 950px)" });
  const isTooSmallScreen = useMediaQuery({ query: "(max-width: 390px)" });

  const [aboutState, setAboutState] = useState(about.slice(0, 492));
  const [dotsAbout, setDotsAbout] = useState("....");
  const [seeAction, setSeeAction] = useState("See More");
  const { isFreelancer } = useUserinfoStore();
  const [showDelete, setshowDelete] = useState(false);
  const [messageDelete, setmessageDelete] = useState("");
  // Muhammed state:
  const [isWorkedWith, setIsWorkedWith] = useState(0);
  const [isProjectPosted, setIsProjectPosted] = useState(0);
  const [isGivenLikes, setIsGivenLikes] = useState(0);
  //Muhammed 2
  const [lowRating, setLowRating] = useState(0);
  const [midRating, setMidRating] = useState(0);
  const [highRating, setHighRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  //circl
  const [posted, setPosted] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleNewProject = () => {
    setIsPopupOpen(true);
  };
  const getProject = async () => {
    try {
      let response = "";
      // if(isFreelancer) {
      // const queryParams = selectedJobs
      // .map((qualification) => `specializations=${qualification}`)
      // .join("&");
      response = await FetchData(`projects/client-feed?page=0&pageSize=10`, {
        method: "GET",
      });
      // } else {
      //   const queryParams = selectedJobs
      //     .map((qualification) => `qualificationNames=${qualification}`)
      //     .join("&");
      //   response = await fetchData(
      //     `projects/client-feed?page=0&pageSize=10&${queryParams}`,
      //     {
      //       method: "GET",
      //     }
      //   );
      // }
      console.log(response.results.result);
      setPosts(response.results.result);
    } catch (e) {
      console.log(e);
    }
  };

  //Muhammed was here
  const [clientsWorkedWith, setClientsWorkedWith] = useState(11);
  const [givenLikes, setGivenLikes] = useState(11);
  const [projectYouApplied, setProjectYouApplied] = useState(11); //
  const [projectYouWorkingOn, setProjectYouWorkingOn] = useState(11);
  const [inReview, setInReview] = useState(11);
  const [todo, setToDo] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(11); //
  const [inProgressProjects, setInProgressProjects] = useState(11);
  //Muhammed free

  const [freeAverageRating, setFreeAverageRating] = useState(0);
  const [freeLowRating, setFreeLowRating] = useState(0);
  const [freeMidRating, setFreeMidRating] = useState(0);
  const [freeHighRating, setFreeHighRating] = useState(0);
  const [freeTotalRating, setFreeTotalRating] = useState(0);

  function ShowDelete(message) {
    setmessageDelete(message);
    setshowDelete(true);
  }

  const getProfile = async () => {
    try {
      const data = await FetchData(`profiles/${localStorage.getItem("id")}`, {
        method: "GET",
      });
      setProfile(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const [chartData, setChartData] = useState(() => {
    return isFreelancer
      ? [
          { value: inProgressProjects, color: "#FFDB70" },
          { value: todo, color: "#86C6F8" },
          { value: inReview, color: "#D9D9D9" },
          { value: completedProjects, color: "#7FC882" },
        ]
      : [
          { value: pending, color: "#FFDB70" },
          { value: posted, color: "#D9D9D9" },
          { value: completed, color: "#7FC882" },
        ];
  });

  useEffect(() => {
    setChartData(
      isFreelancer
        ? [
            { value: inProgressProjects, color: "#FFDB70" },
            { value: todo, color: "#86C6F8" },
            { value: inReview, color: "#D9D9D9" },
            { value: completedProjects, color: "#7FC882" },
          ]
        : [
            { value: pending, color: "#FFDB70" },
            { value: posted, color: "#D9D9D9" },
            { value: completed, color: "#7FC882" },
          ]
    );
  }, [
    isFreelancer,
    inProgressProjects,
    todo,
    inReview,
    completedProjects,
    pending,
    posted,
    completed,
  ]);

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

  // const projects = [
  //   {
  //     id: 1,
  //     title: "Project Name One",
  //     createdAt: "22 Jan 2024 - 11 May  2024.",
  //     desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
  //   },
  //   {
  //     id: 2,
  //     title: "Project Name Two",
  //     createdAt: "22 Jan 2024 - 11 May  2024.",
  //     desc: "Developed a task management web application designed to help users organize, prioritize, and track their daily tasks efficiently. ",
  //   },
  // ];

  const handleInfoProfileAndRating = async () => {
    try {
      const data = await FetchData(
        `clients/${localStorage.getItem("id")}/activities`,
        {
          method: "GET",
        }
      );
      const {
        freelancersWorkedWith,
        projectPosted,
        givenLikes,
        projectsPending,
        projectsInProgress,
        projectsCompleted,
      } = data.results;

      setIsWorkedWith(freelancersWorkedWith);
      setIsGivenLikes(givenLikes);
      setIsProjectPosted(projectPosted);
      setPosted(projectPosted);
      setPending(projectsPending);
      setCompleted(projectsCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  //Muhammed freelancer
  const handleInfoProfileAndRatingFreelancer = async () => {
    try {
      const data = await FetchData(
        `freelancers/${localStorage.getItem("id")}/activities`,
        {
          method: "GET",
        }
      );

      const {
        clientsWorkedWith,
        givenLikes,
        projectYouApplied,
        projectYouWorkingOn,
        inReview,
        toDo,
        completedProjects,
        inProgressProjects,
      } = data.results;

      setClientsWorkedWith(clientsWorkedWith);
      setGivenLikes(givenLikes);
      setProjectYouApplied(projectYouApplied);
      setInReview(inReview);
      setCompletedProjects(completedProjects);
      setToDo(toDo);
      setProjectYouWorkingOn(projectYouWorkingOn);
      setInProgressProjects(inProgressProjects);
    } catch (error) {
      console.log("Login failed. Please try again.");
    }
  };

  //Muhammed
  const fetchRatings = async (userId) => {
    try {
      const { results } = await FetchData(
        `ratings/rating-summary?userId=${userId}`,
        {
          method: "GET",
        }
      );

      const processedRatings = {
        averageRating: parseFloat(results.averageRating, 10),
        totalRating: results.totalRating,
        highRating: results.highRating,
        midRating: results.midRating,
        lowRating: results.lowRating,
      };

      return processedRatings;
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
      throw error;
    }
  };

  const ratings = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const { averageRating, totalRating, highRating, midRating, lowRating } =
        await fetchRatings(userId);

      setAverageRating(averageRating);
      setTotalRating(totalRating);
      setHighRating(highRating);
      setMidRating(midRating);
      setLowRating(lowRating);
    } catch (error) {
      console.error("Error processing ratings:", error.message);
    }
  };

  const ratingsFreelancer = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const { averageRating, totalRating, highRating, midRating, lowRating } =
        await fetchRatings(userId);

      setFreeAverageRating(averageRating);
      setFreeTotalRating(totalRating);
      setFreeHighRating(highRating);
      setFreeMidRating(midRating);
      setFreeLowRating(lowRating);
    } catch (error) {
      console.error("Error processing ratings:", error.message);
    }
  };

  useEffect(() => {
    getProfile();
    handleInfoProfileAndRating();
    ratings();
    getProject();
    ratingsFreelancer();
  }, []);

  useEffect(() => {
    handleInfoProfileAndRatingFreelancer();
  });

  const rating = {
    starRate: averageRating,
    highRate: 82,
    midRate: 12,
    lowRate: 6,
  };

  const handleSeeMore = () => {
    if (about.length < 400) {
      setDotsAbout("");
      setSeeAction("");
      setAboutState(about);
    } else if (dotsAbout === "...." && seeAction === "See More") {
      setAboutState(about);
      setDotsAbout("");
      setSeeAction("Show Less");
    } else {
      setAboutState(about.slice(0, 492));
      setDotsAbout("....");
      setSeeAction("See More");
    }
  };

  useEffect(() => {
    setAboutState(about.slice(0, 492));
    handleSeeMore();
  }, [about]);

  const handleEditAbout = (value) => {
    setAbout(value);
    setAboutState(value.slice(0, 492));
  };

  const handleEditProfile = () => {};
  const [isListVisible, setVisiblePostId] = useState(null);
  const idShow = (id) => {
    setVisiblePostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      {isFreelancer ? (
        <div>
          <Container>
            <div className={styles.profilePageOFFreelancer}>
              <div className={styles.firstRow}>
                <ProfileLeft1 />
              </div>
              <div className={styles.secondRow}>
                <SkilsSide />
              </div>
              <section className={styles.ThirdRow}>
                <Card>
                  <div className={styles.ActivityBox}>
                    <h3 className={styles.ActivityHeader}>Your Activity</h3>
                    <div className={styles.Chart}>
                      <DonutChart
                        data={chartData}
                        barSize={isTooSmallScreen ? 16 : 22}
                        size={isTooSmallScreen ? 140 : 200}
                      >
                        <div>Projects</div>
                        <div>Progress</div>
                      </DonutChart>
                    </div>
                    <div
                      className={styles.ChartInfo}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      {" "}
                      <div className={styles.ChartInfoItem}>
                        <div
                          className={styles.dot}
                          style={{ backgroundColor: "#D9D9D9" }}
                        ></div>
                        <p>{isFreelancer ? "In-Review" : "Posted projects"}</p>
                      </div>
                      {isFreelancer ? (
                        <div className={styles.ChartInfoItem}>
                          <div
                            className={styles.dot}
                            style={{ backgroundColor: "#86C6F8" }}
                          ></div>
                          <p>To-Do</p>
                        </div>
                      ) : null}
                      <div className={styles.ChartInfoItem}>
                        <div
                          className={styles.dot}
                          style={{
                            backgroundColor: isFreelancer
                              ? "#7FC882"
                              : "#FFDB70",
                          }}
                        ></div>
                        <p>
                          {isFreelancer
                            ? "Completed projects"
                            : "Pending projects"}
                        </p>
                      </div>
                      <div className={styles.ChartInfoItem}>
                        <div
                          className={styles.dot}
                          style={{
                            backgroundColor: isFreelancer
                              ? "#FFDB70"
                              : "#7FC882",
                          }}
                        ></div>
                        <p>
                          {isFreelancer
                            ? "InProgress projects"
                            : "Completed projects"}
                        </p>
                      </div>
                    </div>
                    <div className={styles.infoList}>
                      <div className={styles.infoItem}>
                        <UserIcon width={24} height={24} />
                        <div className={styles.label}>
                          Client you worked with
                        </div>
                        <div className={styles.value}>{clientsWorkedWith}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <HeartIcon />
                        <div className={styles.label}>Given Likes</div>
                        <div className={styles.value}>{givenLikes}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <BookWithPlus />
                        <div className={styles.label}>Project you applied</div>
                        <div className={styles.value}>{projectYouApplied}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <TaskDoneIcon />
                        <div className={styles.label}>
                          Project you work on it
                        </div>
                        <div className={styles.value}>
                          {projectYouWorkingOn}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card marginTop={24}>
                  <div className={styles.rateTitleBox}>
                    <h3 className={styles.rateTitle}>Rating</h3>
                    <p className={styles.rateSubtitle}>Average Rating</p>
                    <div className={styles.ratingStars}>
                      <b>{averageRating}</b>
                      <div>
                        {+rating.starRate >= 1 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 2 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 3 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 4 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 5 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                      </div>
                    </div>
                    <div className={styles.ratingBar}>
                      <div className={styles.barItem}>
                        <b>High rate</b>
                        <div className={styles.bar}>
                          <div
                            style={{
                              width: `${freeHighRating}%`,
                              backgroundColor: "#4DB251",
                            }}
                          ></div>
                        </div>
                        <p>{freeHighRating}%</p>
                      </div>
                      <div className={styles.barItem}>
                        <b>Mid rate</b>
                        <div className={styles.bar}>
                          <div
                            style={{
                              width: `${freeMidRating}%`,
                              backgroundColor: "#FFBF00",
                            }}
                          ></div>
                        </div>
                        <p>{freeMidRating}%</p>
                      </div>
                      <div className={styles.barItem}>
                        <b>low rate</b>
                        <div className={styles.bar}>
                          <div
                            style={{
                              width: `${freeLowRating}%`,
                              backgroundColor: "#E4636F",
                            }}
                          ></div>
                        </div>
                        <p>{freeLowRating}%</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card marginTop={24}>
                  <div className={styles.titleReviewsBox}>
                    <h3 className={styles.titleReviews}>Reviews</h3>
                    <p className={styles.subtitleReviews}>
                      Total People who visited your profile
                    </p>
                    <p className={styles.reviews}>
                      <b>{totalRating}</b> review
                    </p>
                    <button className={styles.seeAllReviews}>See all</button>
                  </div>
                </Card>
              </section>
            </div>
          </Container>
        </div>
      ) : (
        <div className={styles.ProfileScreen}>
          <EditAboutPopup
            isOpen={isAboutPopupOpen}
            onClose={() => setIsAboutPopupOpen(false)}
            getData={getProfile}
            initialData={profile?.about}
          />
          <EditProfilePopup
            isOpen={isUserInfoOpen}
            onClose={() => setIsUserInfoOpen(false)}
            isFreelancer={false}
            initialData={{
              name: profile?.name,
              specialization: profile?.companyName,
            }}
            getData={getProfile}
          />
          {/* <ProjectHistoryForm
            isOpen={isUserInfoOpen}
            onClose={() => setIsUserInfoOpen(false)}
            onSave={handleEditProfile}
          /> */}
          {/* <EducationForm isOpen={isUserInfoOpen} onClose={() => setIsUserInfoOpen(false)} /> */}
          <Container paddingx={isSmallScreen ? 0 : 56}>
            <div className={styles.content}>
              <section className={styles.section1}>
                <Card paddingx={24} isProfilePage={true}>
                  <div className={styles.userProfile}>
                    <div className={styles.userInfo}>
                      <img src={profile?.profilePicture} alt="" />
                      <div>
                        <h2>{profile?.name}</h2>
                        <p>{profile?.companyName}</p>
                      </div>
                    </div>
                    <div
                      className={styles.action}
                      onClick={() => setIsUserInfoOpen(true)}
                    >
                      <EditIcon />
                    </div>
                  </div>
                  <div className={styles.about}>
                    <div
                      className={styles.aboutHead}
                      onClick={() => setIsAboutPopupOpen(true)}
                    >
                      <b>About</b>
                      <EditIcon />
                    </div>
                    <p>{profile?.about}</p>
                    <p>{profile?.about}</p>
                  </div>
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
                              {`${startDateOfProject.getFullYear()}-${String(
                                startDateOfProject.getMonth() + 1
                              ).padStart(2, "0")}-${String(
                                startDateOfProject.getDate()
                              ).padStart(2, "0")}`}
                              {` to ${endDateOfProject.getFullYear()}-${String(
                                endDateOfProject.getMonth() + 1
                              ).padStart(2, "0")}-${String(
                                endDateOfProject.getDate()
                              ).padStart(2, "0")}`}
                            </small>
                            <p className={styles.itemDesc}>{p.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <div className={styles.history}>
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
                  </div> */}
                  <div className={styles.posts}>
                    <div className={styles.postsHead}>
                      <b>Your Activity</b>
                      <div className={styles.actions}>
                        <PlusIcon onClick={handleNewProject} />
                      </div>
                    </div>
                    {/* {posts?.map((post) => (
                      <Card marginTop={16} key={post.id} paddingx={16}>
                        <div className={styles.postItem}>
                          <div className={styles.postHead}>
                            <div className={styles.postClient}>
                              <div className={styles.postAvatar}></div>
                              <div>
                                <b className={styles.postClientName}>
                                  {post?.client?.name}
                                </b>
                                <br />
                                <small className={styles.postClientDate}>
                                  {post?.client?.createdAt}
                                </small>
                              </div>
                            </div>

                            <div className={styles.postClientAction}>
                              <div className={styles.tag}>Available</div>
                              <MoreIcon
                                onClick={() => idShow(post.id)}
                                style={{ cursor: "pointer" }}
                              />
                              {isListVisible === post.id && (
                                <div
                                  className={styles.list}
                                  style={{
                                    marginTop: "170px",
                                    position: "absolute",
                                  }}
                                >
                                  <button>Edit</button>
                                  <button
                                    className={styles.deletebtnForPost}
                                    onClick={() =>
                                      ShowDelete(
                                        "Are you sure u want to delete this Post"
                                      )
                                    }
                                  >
                                    delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className={styles.postBody}>
                            <b className={styles.postTitle}>{post?.title}</b>
                            <p className={styles.postDesc}>{post.desc}</p>
                          </div>

                          {!!post?.image ? (
                            <img
                              className={styles.postImage}
                              src={post?.image}
                            />
                          ) : (
                            <div>
                              <div className={styles.moreInfo}>
                                <b className={styles.infoTitle}>
                                  Duration of project
                                </b>
                                <p className={styles.infoValue}>
                                  {post.duration}
                                </p>
                              </div>
                              <div className={styles.moreInfo}>
                                <b className={styles.infoTitle}>Pricing</b>
                                <p className={styles.infoValue}>
                                  Hourly $ {post.price}
                                </p>
                              </div>
                            </div>
                          )}
                          <div className={styles.postFooter}>
                            <div className={styles.footerItem}>
                              <HeartIcon /> <span>like</span>
                            </div>
                            <div className={styles.footerItem}>
                              <CommentsIcon /> <span>comment</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}*/}
                    {posts?.map((post) => (
                      <ProjectPost
                        key={post.id}
                        post={post}
                        isProfilepage={true}
                      />
                    ))}
                  </div>
                  <div className={styles.LineInBottom}></div>
                  <button className={styles.seeAllReviews}>See all</button>
                </Card>
              </section>
              <section className={styles.section2}>
                <Card paddingx={24} isProfilePage={true}>
                  <div className={styles.ActivityBox}>
                    <h3 className={styles.ActivityHeader}>Your Activity</h3>
                    <div className={styles.Chart}>
                      <DonutChart
                        data={chartData}
                        barSize={isTooSmallScreen ? 16 : 22}
                        size={isTooSmallScreen ? 140 : 200}
                      >
                        <div>Projects</div>
                        <div>Progress</div>
                      </DonutChart>
                    </div>
                    <div className={styles.ChartInfo}>
                      <div className={styles.ChartInfoItem}>
                        <div
                          className={styles.dot}
                          style={{ backgroundColor: "#D9D9D9" }}
                        ></div>
                        <p>Posted projects</p>
                      </div>
                      <div className={styles.ChartInfoItem}>
                        <div
                          className={styles.dot}
                          style={{ backgroundColor: "#FFDB70" }}
                        ></div>
                        <p>Pending projects</p>
                      </div>
                      <div className={styles.ChartInfoItem}>
                        <div
                          className={styles.dot}
                          style={{ backgroundColor: "#7FC882" }}
                        ></div>
                        <p>Completed projects</p>
                      </div>
                    </div>
                    <div className={styles.infoList}>
                      <div className={styles.infoItem}>
                        <UserIcon width={24} height={24} />
                        <div className={styles.label}>
                          freelancer worked with
                        </div>
                        <div className={styles.value}>{isWorkedWith}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <HeartIcon />
                        <div className={styles.label}>Given Likes</div>
                        <div className={styles.value}>{isGivenLikes}</div>
                      </div>
                      <div className={styles.infoItem}>
                        <TaskDoneIcon />
                        <div className={styles.label}>Project Posted</div>
                        <div className={styles.value}>{isProjectPosted}</div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card marginTop={24} paddingx={24} isProfilePage={true}>
                  <div className={styles.rateTitleBox}>
                    <h3 className={styles.rateTitle}>Rating</h3>
                    <p className={styles.rateSubtitle}>Average Rating</p>
                    <div className={styles.ratingStars}>
                      <b>{averageRating}</b>
                      <div>
                        {+rating.starRate >= 1 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 2 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 3 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 4 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                        {+rating.starRate >= 5 ? (
                          <Star2Icon />
                        ) : (
                          <EmptyStarIcon />
                        )}
                      </div>
                    </div>
                    <div className={styles.ratingBar}>
                      <div className={styles.barItem}>
                        <b>High rate</b>
                        <div className={styles.bar}>
                          <div
                            style={{
                              width: `${highRating}%`,
                              backgroundColor: "#4DB251",
                            }}
                          ></div>
                        </div>
                        <p>{`${highRating}%`}</p>
                      </div>
                      <div className={styles.barItem}>
                        <b>Mid rate</b>
                        <div className={styles.bar}>
                          <div
                            style={{
                              width: `${midRating}%`,
                              backgroundColor: "#FFBF00",
                            }}
                          ></div>
                        </div>
                        <p>{`${midRating}%`}</p>
                      </div>
                      <div className={styles.barItem}>
                        <b>low rate</b>
                        <div className={styles.bar}>
                          <div
                            style={{
                              width: `${lowRating}%`,
                              backgroundColor: "#E4636F",
                            }}
                          ></div>
                        </div>
                        <p>{`${lowRating}%`}</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card marginTop={24} paddingx={24} isProfilePage={true}>
                  <div className={styles.titleReviewsBox}>
                    <h3 className={styles.titleReviews}>Reviews</h3>
                    <p className={styles.subtitleReviews}>Total Reviews</p>
                    <p className={styles.reviews}>
                      <b>{totalRating}</b> review
                    </p>
                    <button className={styles.seeAllReviews}>See all</button>
                  </div>
                </Card>
              </section>
            </div>
          </Container>

          <DeleteComponent
            isOpen={showDelete}
            message={messageDelete}
            onClose={() => setshowDelete(false)}
          />
        </div>
      )}

      <DeleteComponent
        isOpen={showDelete}
        message={messageDelete}
        onClose={() => setshowDelete(false)}
        TypeofDelete={`freelancers/certifications`}
        id={80}
      />
      <TwoStageFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default ProfileScreen;
