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
import EmptyStarIcon from "../../CustomIcons/emptyStarIcon";
import Star2Icon from "../../CustomIcons/Star2Icon";
import { useEffect, useState } from "react";
const ProfileScreen = () => {
  const aboutValue =
    "As a software manager with a passion for technology and team development, I specialize in guiding projects from concept to completion. With a strong focus on collaboration and clear communication, I work closely with clients and developers to ensure we deliver high-quality solutions that meet our stakeholders' needs. My goal is to bridge the gap between technical expertise and client vision, helping teams create innovative software that drives results and keeps pace with industry demands,Developed a task management web application designed to help users organize";
  const [aboutState, setAboutState] = useState(aboutValue.slice(0, 492));
  const [dotsAbout, setDotsAbout] = useState("....");
  const [seeAction, setSeeAction] = useState("See More");
  const chartData = [
    { value: 25, color: "#FFDB70" },
    { value: 25, color: "#D9D9D9" },
    { value: 25, color: "#7FC882" },
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
  const rating = {
    starRate: "4.0",
    highRate: 82,
    midRate: 12,
    lowRate: 6,
  };

  return (
    <div className={styles.ProfileScreen}>
      <Container paddingx={56}>
        <div className={styles.content}>
          <section className={styles.section1}>
            <Card marginBottom={152} paddingx={24} marginbottom={152}>
              <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                  <img src="./avatar.png" alt="" />
                  <div>
                    <h2>Mustafa Emad</h2>
                    <p>Business scope</p>
                  </div>
                </div>
                <div className={styles.action}>
                  <EditIcon />
                </div>
              </div>
              <div className={styles.about}>
                <div className={styles.aboutHead}>
                  <b>About</b>
                  <EditIcon />
                </div>
                <p>
                  {aboutState}
                  {dotsAbout}{" "}
                  <span
                    className={styles.seeMoreAbout}
                    onClick={() => {
                      if (aboutValue.length < 400) {
                        setDotsAbout("");
                        setSeeAction("");
                        setAboutState(aboutValue);
                      } else
                       if (
                        dotsAbout === "...." &&
                        seeAction === "See More"
                      ) {
                        setAboutState(aboutValue);
                        setDotsAbout("");
                        setSeeAction("Show Less");
                      } else {
                        setAboutState(aboutValue.slice(0, 492));
                        setDotsAbout("....");
                        setSeeAction("See More");
                      }
                    }}
                  >
                    {seeAction}
                  </span>
                </p>
              </div>

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
              <div className={styles.posts}>
                <div className={styles.postsHead}>
                  <b>Your Activity</b>
                  <div className={styles.actions}>
                    <PlusIcon />
                    <EditIcon />
                  </div>
                </div>
                {posts?.map((post) => (
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
                          <MoreIcon />
                        </div>
                      </div>

                      <div className={styles.postBody}>
                        <b className={styles.postTitle}>{post?.title}</b>
                        <p className={styles.postDesc}>{post.desc}</p>
                      </div>

                      {!!post?.image ? (
                        <img className={styles.postImage} src={post?.image} />
                      ) : (
                        <div>
                          <div className={styles.moreInfo}>
                            <b className={styles.infoTitle}>
                              Duration of project
                            </b>
                            <p className={styles.infoValue}>{post.duration}</p>
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
                ))}
              </div>
              <div className={styles.LineInBottom}></div>
              <button className={styles.seeAllReviews}>See all</button>
            </Card>
          </section>
          <section className={styles.section2}>
            <Card paddingx={24}>
              <h3 className={styles.ActivityHeader}>Your Activity</h3>
              <div className={styles.Chart}>
                <DonutChart data={chartData} barSize={22} size={200}>
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
                  <div className={styles.label}>freelancer worked with</div>
                  <div className={styles.value}>8</div>
                </div>
                <div className={styles.infoItem}>
                  <HeartIcon />
                  <div className={styles.label}>Given Likes</div>
                  <div className={styles.value}>32</div>
                </div>
                <div className={styles.infoItem}>
                  <TaskDoneIcon />
                  <div className={styles.label}>Project Posted</div>
                  <div className={styles.value}>14</div>
                </div>
              </div>
            </Card>
            <Card marginTop={24} paddingx={24}>
              <h3 className={styles.rateTitle}>Rating</h3>
              <p className={styles.rateSubtitle}>Average Rating</p>
              <div className={styles.ratingStars}>
                <b>{rating.starRate}</b>
                <div>
                  {+rating.starRate >= 1 ? <Star2Icon /> : <EmptyStarIcon />}
                  {+rating.starRate >= 2 ? <Star2Icon /> : <EmptyStarIcon />}
                  {+rating.starRate >= 3 ? <Star2Icon /> : <EmptyStarIcon />}
                  {+rating.starRate >= 4 ? <Star2Icon /> : <EmptyStarIcon />}
                  {+rating.starRate >= 5 ? <Star2Icon /> : <EmptyStarIcon />}
                </div>
              </div>
              <div className={styles.ratingBar}>
                <div className={styles.barItem}>
                  <b>High rate</b>
                  <div className={styles.bar}>
                    <div
                      style={{
                        width: `${rating.highRate}%`,
                        backgroundColor: "#4DB251",
                      }}
                    ></div>
                  </div>
                  <p>{rating.highRate}%</p>
                </div>
                <div className={styles.barItem}>
                  <b>Mid rate</b>
                  <div className={styles.bar}>
                    <div
                      style={{
                        width: `${rating.midRate}%`,
                        backgroundColor: "#FFBF00",
                      }}
                    ></div>
                  </div>
                  <p>{rating.midRate}%</p>
                </div>
                <div className={styles.barItem}>
                  <b>low rate</b>
                  <div className={styles.bar}>
                    <div
                      style={{
                        width: `${rating.lowRate}%`,
                        backgroundColor: "#E4636F",
                      }}
                    ></div>
                  </div>
                  <p>{rating.lowRate}%</p>
                </div>
              </div>
            </Card>
            <Card marginTop={24} paddingx={24}>
              <h3 className={styles.titleReviews}>Reviews</h3>
              <p className={styles.subtitleReviews}>
                Total People who visited your profile
              </p>
              <p className={styles.reviews}>
                <b>70</b> review
              </p>
              <button className={styles.seeAllReviews}>See all</button>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
};
export default ProfileScreen;
