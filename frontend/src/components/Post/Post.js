import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/man.png";
import CommentIcon from "../../assets/comment.png";
import HeartIcon from "../../assets/heart.png";
import LikedIcon from "../../assets/heart-red.png";
import postService from "../../services/postService";
import classes from "./Post.module.css";


export default function Post({ post, updatePosts, isDetails }) {
  const { name, username, avatarUrl } = post.createdBy;
  const { id, isLiked, date, likes, comments, content } = post;
  const parsedDate = new Date(date).toLocaleString("default", { month: "short", day: "numeric" });
  
  const linkStyle = {
    textDecoration: "none",
    color: "black"
  };

  const handleLike = async () => {

    try {
      const response = await postService.toggleLike(id, isLiked);

      updatePosts(id, {
        ...response,
        isLiked: !isLiked
      });

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className={classes.post}>
      <div className={classes.postAvatar}>
        <img src={!avatarUrl ? UserIcon : avatarUrl} alt="user-avatar" />
      </div>
      <div className={classes.postMore}>
        <div className={classes.postInfo}>
          <Link to={`/profile/${username}`} style={linkStyle}>
            <span className={classes.postUser}>{name}</span>
          </Link>
          <span className={classes.postUsername}>@{username}</span>
          <span className={classes.postDate}>{parsedDate}</span>
        </div>
        <div className={classes.postContent}>
          {content}
        </div>
        {
          !isDetails ?
            <div className={classes.postOptions}>
              <div className={classes.postComment}>
                <Link to={`/posts/${id}`}>
                  <img src={CommentIcon} alt="comment-icon" />
                </Link>
                <span className={classes.count}>{comments.length}</span>
              </div>
              <div className={classes.postLike}>
                {/* handleLike can be undefined */}
                <img src={isLiked ? LikedIcon : HeartIcon} alt="heart-icon" onClick={updatePosts ? handleLike : updatePosts} />
                <span className={classes.count}>{likes}</span>
              </div>
            </div>
            : null
        }
      </div>
    </div>
  );
}
