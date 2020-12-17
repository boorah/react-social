import React from "react";
import Post from "../Post/Post";
import Comment from "../Comment/Comment";
import "./PostDetail.css";

export default function PostDetail() {
  return (
    <>
      <Post />
      <div className="divider"></div>
      <Comment />
      <form className="add-comment-form">
        <input name="comment" type="text" placeholder="Add comment"/>
        <button className="comment-button">Comment</button>
      </form>
    </>
  );
}
