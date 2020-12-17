import React from "react";
import UserIcon from "../../assets/man.png";
import CommentIcon from "../../assets/comment.png";
import HeartIcon from "../../assets/heart.png";
import "./Post.css";

export default function Post() {
  return (
    <div className="post">
      <div className="post__avatar">
        <img src={UserIcon} alt="user-avatar" />
      </div>
      <div className="post__more">
        <div className="post__info">
          <span className="post__user">John Doe</span>
          <span className="post__username">@john12</span>
          <span className="post__date">Dec 14</span>
        </div>
        <div className="post__content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem quidem quibusdam repellendus cum ullam modi harum, veniam dolor. Architecto!
        </div>
        <div className="post__options">
          <div className="post__comment">
            <img src={CommentIcon} alt="comment-icon"/>
            <span className="comment-count">10</span>
          </div>
          <div className="post__like">
            <img src={HeartIcon} alt="heart-icon"/>
            <span className="like-count">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
