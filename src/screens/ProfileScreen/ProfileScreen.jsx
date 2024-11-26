import Card from '../../components/Card/card';
import Container from '../../components/Container/container';
import CommentsIcon from '../../CustomIcons/CommentsIcon';
import EditIcon from '../../CustomIcons/EditIcon';
import HeartIcon from '../../CustomIcons/HeartIcon';
import MoreIcon from '../../CustomIcons/MoreIcon';
import PlusIcon from '../../CustomIcons/PlusIcon';
import styles from './ProfileScreen.module.css'
const ProfileScreen = () => {
    

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
    return (
        <div className={styles.ProfileScreen}>
            <Container>
                <div className={styles.content}>
                    <section className={styles.section1}>
                        <Card>
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
                                GreenTech Solutions Inc. Renewable Energy & Technology San
                                Francisco, California, with operations in North America and
                                Europe
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
                                <Card marginTop={16} key={post.id}>
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
                                            <b className={styles.infoTitle}>Duration of project</b>
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
                            
                        </Card>
                    </section>
                    <section className={styles.section2}>
section2
                    </section>
                </div>
            </Container>
        </div>
    )
}
export default ProfileScreen;