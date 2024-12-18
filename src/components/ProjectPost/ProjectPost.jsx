import { useState } from "react";
import CommentsIcon from "../../CustomIcons/CommentsIcon";
import HeartIcon from "../../CustomIcons/HeartIcon";
import MoreIcon from "../../CustomIcons/MoreIcon";
import Card from "../Card/card";
import CustomButton from "../customButton/CustomButton";
import ApplyToProjectFormPopup from "../ApplyToProjectFormPopup/ApplyToProjectFormPopup";
import styles from "./ProjectPost.module.css";
import { useMediaQuery } from "react-responsive";
import useUserinfoStore from "../../useUserinfoStore";
import CommentForm from "../CommentForm/CommentForm";
const projectPost = ({
  post,
}) => {
  const { isFreelancer } = useUserinfoStore()
  const [applyPopup, setApplyPopup] = useState(false);
  const [isListVisible, setVisiblePostId] = useState(null);
  const [seeMore, setSeeMore] = useState(false)
  const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });
  const [isLiked, setIsLiked ] = useState(post.isLiked);
  const [totalLikes, setTotalLikes] = useState(post?.paginatedLikes.total)
  const [totalComments, setTotalComments] = useState(post?.paginatedComments.total)
  const [isCommentForm, setIsCommentForm] = useState(false);

  const idShow = (i) => {
    setVisiblePostId((prevId) => (prevId === i ? null : i));
  };
  const handleToggleHeart = async() => {
    try {
      await fetch(`http://16.170.247.41/api/web/v1/projects/${post.id}/likes?action=${isLiked? 'unlike' : 'like'}`, {
        method: 'POST'
      })
      if(isLiked) {
        setTotalLikes(totalLikes-1)
      } else {
        setTotalLikes(totalLikes+1)
      }
      setIsLiked(!isLiked)
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <>
      <Card marginTop={16} key={post.id}>
        <div className={styles.postItem}>
          <div className={styles.postHead}>
            <div className={styles.postClient}>
              <div className={styles.postAvatar}>
                <img src={post?.clientProfilePicture} alt="" />
              </div>
              <div>
                <b className={styles.postClientName}>{post?.clientName}</b>
                <br />
                <small className={styles.postClientDate}>
                  {post?.creationTime}
                </small>
              </div>
            </div>
            <div className={styles.postClientAction}>
              <div className={styles.tag}>{post?.status}</div>
              <MoreIcon onClick={() => idShow(post.id)} />
              {/* {isListVisible === post.id && (
                <div
                  className={styles.list}
                  style={{ marginTop: "220px", position: "absolute" }}>
                  <button>Share</button>
                  <button>Copy link</button>
                  <button>{isFreelancer ? "report" : "delete"}</button>
                </div>
              )} */}
            </div>
          </div>
          <div className={styles.postBody}>
            <b className={styles.postTitle}>{post?.title}</b>
            <p className={styles.postDesc}>{post.description}</p>
          </div>
          {}
          {(!post?.imageUrl || seeMore) && (
            <div>
              <div className={styles.moreInfo}>
                <b className={styles.infoTitle}>Duration of project</b>
                <p className={styles.infoValue}>{post?.duration}</p>
              </div>
              <div className={styles.moreInfo}>
                <b className={styles.infoTitle}>Pricing</b>
                <p className={styles.infoValue}>Hourly $ {post.budget}</p>
              </div>
            </div>
          )}
          {post?.imageUrl && (
            <>
              {seeMore ? (
                <span onClick={() => setSeeMore(false)} className={styles.seeLess}>See less</span>
              ) : (
                <span onClick={() => setSeeMore(true)} className={styles.seeLess}>See more</span>
              )}
              <img className={styles.postImage} src={post?.imageUrl} />
            </>
          )}
          <div className={styles.postFooter1}>
            <div className={styles.postFooter2}>
              <div className={styles.footerItem}>
                <HeartIcon onClick={ handleToggleHeart} isFilled={isLiked} /> <span>{(totalLikes)} like</span>
              </div>
              <div className={styles.footerItem} onClick={setIsCommentForm}>
                <CommentsIcon /> <span>{totalComments} comment</span>
              </div>
            </div>
            <CustomButton
              Width={isSmallScreen ? "100%" : "128px"}
              style={{ margin: "0px", marginLeft: "auto" }}
              onClick={() => setApplyPopup(true)}
              Display={isFreelancer}
            >
              Apply now
            </CustomButton>
          </div>
        </div>
        <ApplyToProjectFormPopup
          projectId={post.id}
          isOpen={applyPopup}
          onClose={() => setApplyPopup(false)}
        />
        <CommentForm
          isOpen={isCommentForm}
          postId={post.id}
          newCommentAdded={() => setTotalComments(totalComments+1)}
          onClose={() => setIsCommentForm(!isCommentForm)}
        />
      </Card>
    </>
  );
};
export default projectPost;
