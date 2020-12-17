import React from "react";
import "./Comment.css";

export default function Comment() {
  return (
    <div className="comment">
      <div className="comment__info">
        <span className="comment__user">Maria</span>
        <span className="comment__username">@maria</span>
      </div>
      <div className="comment__content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia dolor quos commodi officiis omnis perferendis tempore qui quibusdam vitae dolorum!
      </div>
    </div>
  );
}
