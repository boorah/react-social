import React from "react";
import userService from "../../services/userService";
import classes from "./FollowButton.module.css";

export default function FollowButton({ id, isMe, isFollowing, update }) {

  const handleFollow = async () => {

    try {
      await userService.toggleFollow(id, isFollowing);
      update(id);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      {
        !isMe ?
          (isFollowing ?
            <button className={classes.following} onClick={handleFollow}>Following</button> :
            <button className={classes.follow} onClick={handleFollow}>Follow</button>
          ) :
          null
      }
    </div>
  );
}
