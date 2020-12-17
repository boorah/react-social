import React from "react";
import UserIcon from "../../assets/man.png";
import GalleryIcon from "../../assets/gallery.png";
import Post from "../Post/Post";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="add-post">
        <div className="add-post__avatar">
          <img src={UserIcon} alt="user-avatar" />
        </div>
        <div className="add-post__more">
          <textarea className="add-post__textarea" name="post-content" rows="4" placeholder="What's happening?">
          </textarea>
          <div className="add-post__post-options">
            <div className="add-post__gallery">
              <img src={GalleryIcon} alt="gallery-icon" />
            </div>
            <button className="add-post__post-button">
              Post
            </button>
          </div>
        </div>
      </div>
      <Post />
    </>
  );
}
