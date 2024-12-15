import { useState } from "react";
import CommentsIcon from "../../CustomIcons/CommentsIcon";
import HeartIcon from "../../CustomIcons/HeartIcon";
import MoreIcon from "../../CustomIcons/MoreIcon";
import Card from "../Card/card";
import CustomButton from "../customButton/CustomButton";
import ApplyToProjectFormPopup from "../ApplyToProjectFormPopup/ApplyToProjectFormPopup";
import styles from "./ProjectPost.module.css";
import { useMediaQuery } from "react-responsive";
const projectPost = ({
  post,
  isFreeLancer = false,
  IsCommentForm = false,
  SetIsCommentForm,
}) => {
  const [applyPopup, setApplyPopup] = useState(false);
  const [isListVisible, setVisiblePostId] = useState(null);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });

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
              <MoreIcon onClick={() => idShow(post.id)} />
              {/* {isListVisible === post.id && (
                <div
                  className={styles.list}
                  style={{ marginTop: "220px", position: "absolute" }}>
                  <button>Share</button>
                  <button>Copy link</button>
                  <button>{isFreeLancer ? "report" : "delete"}</button>
                </div>
              )} */}
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
          <div className={styles.postFooter1}>
            <div className={styles.postFooter2}>
              <div className={styles.footerItem}>
                <HeartIcon /> <span>like</span>
              </div>
              <div className={styles.footerItem} onClick={SetIsCommentForm}>
                <CommentsIcon /> <span>comment</span>
              </div>
            </div>
            <CustomButton
              Width={isSmallScreen ? "100%" : "128px"}
              style={{ margin: "0px", marginLeft: "auto" }}
              onClick={() => setApplyPopup(true)}
              Display={isFreeLancer}
            >
              Apply now
            </CustomButton>
          </div>
        </div>
        <ApplyToProjectFormPopup
          isOpen={applyPopup}
          onClose={() => setApplyPopup(false)}
        />
      </Card>
    </>
  );
};
export default projectPost;
