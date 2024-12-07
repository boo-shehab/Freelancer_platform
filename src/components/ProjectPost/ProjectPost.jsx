import CommentsIcon from "../../CustomIcons/CommentsIcon";
import HeartIcon from "../../CustomIcons/HeartIcon";
import MoreIcon from "../../CustomIcons/MoreIcon";
import Card from "../Card/card";
import CustomButton from "../customButton/CustomButton";
import styles from "./ProjectPost.module.css";
import { useState } from "react";
const projectPost = ({ post , isFreeLancer}) => {
  const [isListVisible, setVisiblePostId] = useState(null);
  const idShow = (id) => {
    setVisiblePostId((prevId) => (prevId === id ? null : id));
  };
    return (
    <>
      <Card marginTop={16} key={post.id}>
        <div className={styles.postItem}>
          <div className={styles.postHead}>
            <div className={styles.postClient}>
              <div className={styles.postAvatar}></div>
              <div>
                <b className={styles.postClientName}>{post?.client?.name}</b>
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

              />

              {isListVisible===post.id && (
                <div className={styles.list} style={{marginTop: "220px", position: "absolute" }}>
                    <button>Share</button>
                    <button>Copy link</button>
                    <button>{isFreeLancer ? "report" : "delete"}</button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.postBody}>
            <b className={styles.postTitle}>{post?.title}</b>
            <p className={styles.postDesc}>{post.desc}</p>
          </div>
          {post?.image ? (
            <img className={styles.postImage} src={post?.image} />
          ) : (
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
          <div className={styles.postFooter}>
            <div className={styles.footerItem}>
              <HeartIcon /> <span>like</span>
            </div>
            <div className={styles.footerItem}>
              <CommentsIcon /> <span>comment</span>
            </div>
            <CustomButton
              style={{ margin: "0px", marginLeft: "auto", width: "auto" }}
            >
              Apply now
            </CustomButton>
          </div>
        </div>
      </Card>
    </>
  );
};

export default projectPost;
