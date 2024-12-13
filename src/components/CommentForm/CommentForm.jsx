import React, { useState } from "react";
import styles from "./CommentForm.module.css";
import ContainerForm from "../ContainerForm/ContainerForm";
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
const CommentForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <ContainerForm
      isOpen={isOpen}
      onClose={onClose}
      Hight="60%"
      HeadName="Comments"
    >
      <div className={styles.commentList}>
        {Comment.map((i) => (
          <div className={styles.CommentCard}>
            <div className={styles.CommentCardSpaceBetween}>
              <img src={i.image} alt="" className={styles.CommentCardImg} />
              <div className={styles.Comment}>
                <h4>{i.name}</h4>
                <p>{i.Comment}</p>
                <p className={styles.date}>{i.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.postComment}>
        <input
          className={styles.postCommentInput}
          placeholder=" Enter comment"
          type=""
        />{" "}
        <button className={styles.postCommentBtn}>Post</button>
      </div>
    </ContainerForm>
  );
};

export default CommentForm;
