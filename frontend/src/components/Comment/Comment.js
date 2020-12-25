import React from "react";
import classes from "./Comment.module.css";

export default function Comment({ createdBy, content }) {
  return (
    <div className={classes.comment}>
      <div>
        <span className={classes.commentUser}>{ createdBy.name }</span>
        <span className={classes.commentUsername}>@{ createdBy.username }</span>
      </div>
      <div className={classes.commentContent}>
        { content }
      </div>
    </div>
  );
}
