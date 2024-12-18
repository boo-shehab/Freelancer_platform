import { useEffect, useState } from "react";
import styles from "./CommentForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
import fetchData from "../../utility/fetchData";
const Comment = [
  {
    id: 1,
    name: "Muhammed",
    image: "./avatar.png",
    date: "12 y",
    Comment: "This is such a great post! Thanks for sharing your thoughts.",
  },
  {
    id: 2,
    name: "Ali Saffa",
    image: "./avatar.png",
    date: "1 y",
    Comment: "Keep up the amazing work! You're doing awesome.",
  },
  {
    id: 3,
    name: "Ahmed Abas",
    image: "./avatar.png",
    date: "12 jan",
    Comment: "I can totally relate to this. It resonates with my experience.",
  },
  {
    id: 4,
    name: "Mustafa wisam",
    image: "./avatar.png",
    date: "2 feb",
    Comment:
      "You made an interesting point. Have you considered [related idea]?",
  },
  {
    id: 5,
    name: "Ahmed Dhafer",
    image: "./avatar.png",
    date: "12 h",
    Comment: "Thank you for sharing this—it really brightened my day!",
  },
  {
    id: 6,
    name: "Muhammed",
    image: "./avatar.png",
    date: "10 d",
    Comment:
      "This is really cool! Can you share more details about [specific topic]?This is really cool! Can you share more details about [specific topic]?This is really cool! Can you share more details about [specific topic]?This is really cool! Can you share more details about [specific topic]?This is really cool! Can you share more details about [specific topic]?",
  },
  {
    id: 7,
    name: "Muhammed",
    image: "./avatar.png",
    date: "12 min",
    Comment: "This is fascinating. What inspired you to post this?",
  },
  {
    id: 8,
    name: "Muhammed",
    image: "./avatar.png",
    date: "1w",
    Comment: "I love your perspective on this! It's refreshing to see.",
  },
  {
    id: 9,
    name: "Muhammed",
    image: "./avatar.png",
    date: "1h",
    Comment: "I couldn't agree more—it's like you read my mind!",
  },
  {
    id: 10,
    name: "Muhammed",
    image: "./avatar.png",
    date: "1 m",
    Comment: "Exactly! I've been thinking the same thing recently.",
  },
];
const CommentForm = ({ isOpen, onClose, postId, newCommentAdded }) => {
  const [comment, setComment] = useState([])
  const [newComment, setNewComment] = useState('')
  const getComment = async() => {
    setComment([]);
    try{
      const response = await fetchData(`projects/${postId}/comments?page=0&pageSize=10`, {
        method: 'GET',
      })
      setComment(response.results.result);
    }catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if(isOpen) {
      getComment()
    }
  }, [isOpen])
  const formattedDate = (dataDate) => {
    const date = new Date(dataDate);
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Format as YYYY-MM-DD
    return `${year}-${month}-${day}`;
    
  }

  const postComment = async () => {
    const formData = new FormData();
    formData.append('Content', newComment);
    console.log(newComment);
    
    try {
        const response = await fetchData(
            `projects/${postId}/comments`,
            {
                method: 'POST',
                body: formData
            },
            {
              Accept: "*/*",
            }
        );
        console.log('Response:', response);
        getComment()
        newCommentAdded()
        setNewComment('')
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

  // const handleNewComment = async() => {
  //   try{
  //     const response = fetchData(`projects/${postId}/comments`, {
  //       method: 'POST',
  //       body: 
  //     })
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }
  if (!isOpen) return null;
  return (
    <ContainerForm
      isOpen={isOpen}
      onClose={onClose}
      Hight="60%"
      HeadName="Comments"
    >
      <div className={styles.commentList}>
        {comment.map((i) => (
          <div className={styles.CommentCard}>
            <div className={styles.CommentCardSpaceBetween}>
              <img src={i.profilePicture} alt="" className={styles.CommentCardImg} />
              <div className={styles.Comment}>
                <h4>{i.commenterName}</h4>
                <p>{i.content}</p>
                <p className={styles.date}>{formattedDate(i.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.postComment}>
        <input
          className={styles.postCommentInput}
          placeholder=" Enter comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          type=""
        />{" "}
        <button className={styles.postCommentBtn} onClick={postComment}>Post</button>
      </div>
    </ContainerForm>
  );
};

export default CommentForm;
