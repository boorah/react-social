import React from "react";
import UserIcon from "../../assets/man.png";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile__info">
        <div className="profile__avatar">
          <img src={UserIcon} alt="user-avatar" />
        </div>
        <div className="profile__more">
          <div className="profile__user">
            <span className="profile__name">John Doe</span>
            <span className="profile__join-date">Joined on December 12</span>
          </div>
          <div className="profile__stats">
            <div className="profile__stat">
              <span className="count">10</span>
              <span>Posts</span>
            </div>
            <div className="profile__stat">
              <span className="count">10</span>
              <span>Followers</span>
            </div>
            <div className="profile__stat">
              <span className="count">10</span>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>
      <p className="profile__about">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consectetur!
      </p>
    </div>
  );
}
