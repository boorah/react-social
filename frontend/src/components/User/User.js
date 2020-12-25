import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/man.png";
import FollowButton from "../FollowButton/FollowButton";
import classes from "./User.module.css";

export default function User({ user, updateUsers }) {
  const { id, name, username, about, isFollowing, isMe, avatarUrl } = user;

  const linkStyle = {
    color: "black",
    textDecoration: "none"
  };

  

  return (
    <div className={classes.user}>
      <div className={classes.avatar}>
        <img src={!avatarUrl ? UserIcon : avatarUrl} alt="user-avatar" />
      </div>
      <div className={classes.more}>
        <div>
          <div>
            <Link to={`/profile/${username}`} style={linkStyle}>
              <span className={classes.name}>{name}</span>
            </Link>
            <span className={classes.username}>@{username}</span>
          </div>
          <p className={classes.about}>{about}</p>
        </div>
        <FollowButton id={id} isFollowing={isFollowing} isMe={isMe} update={updateUsers} />
      </div>
    </div>
  );
}
