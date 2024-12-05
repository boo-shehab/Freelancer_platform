import Card from "../Card/card";
import CommentsIcon from "../../CustomIcons/CommentsIcon2";
import HeartIcon from "../../CustomIcons/HeartIcon";
import MoreIcon from "../../CustomIcons/MoreIcon";
import styles from './FreelancerPost.module.css';
import SearchIcon from "../../CustomIcons/SearchIcon";
import { useState } from 'react';

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
      createdAt: "Posted 2 hours ago",
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
      createdAt: "Posted 2 hours ago",
    },
  },
];

const FreelancerPosts = () => {
  const [expandedPost, setExpandedPost] = useState(null);

  const handleSeeMoreClick = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null); 
    } else {
      setExpandedPost(postId); 
    }
  };

  return (
    <div className={styles.freelancerPost}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
        <button>Search</button>
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
              <p className={styles.postDesc}>
                {post.desc}

                {post.image && (
                  <span
                    className={styles.seeMore}
                    onClick={() => handleSeeMoreClick(post.id)}
                  >
                    {expandedPost === post.id ? '...see less' : '...see more'}
                  </span>
                )}
              </p>
            </div>

            {!post?.image && (
              <div>
                <div className={styles.moreInfo}>
                  <b className={styles.infoTitle}>Duration of project</b>
                  <p className={styles.infoValue}>{post.duration}</p>
                </div>
                <div className={styles.moreInfo}>
                  <b className={styles.infoTitle}>Pricing</b>
                  <p className={styles.infoValue}>Hourly $ {post.price}</p>
                </div>
              </div>
            )}

 
            {post?.image && expandedPost === post.id && (
              <div>
                <div className={styles.moreInfo}>
                  <b className={styles.infoTitle}>Duration of project</b>
                  <p className={styles.infoValue}>{post.duration}</p>
                </div>
                <div className={styles.moreInfo}>
                  <b className={styles.infoTitle}>Pricing</b>
                  <p className={styles.infoValue}>Hourly $ {post.price}</p>
                </div>
              </div>
            )}

  
            {!!post?.image && <img className={styles.postImage} src={post?.image} />}

            <div className={styles.postFooter}>
              <div className={styles.action}>
                <div className={styles.footerItem}>
                  <HeartIcon /> <span>like</span>
                </div>
                <div className={styles.footerItem}>
                  <CommentsIcon /> <span>comment</span>
                </div>
              </div>
              <button>Apply now</button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FreelancerPosts;
