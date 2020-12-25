import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import UserIcon from "../../assets/man.png";
import GalleryIcon from "../../assets/gallery.png";
import Post from "../../components/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import Nothing from "../../components/Nothing";
import postService from "../../services/postService";
import classes from "./Home.module.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const fetchFeedPosts = async () => {
    try {
      const response = await postService.getUserFeed();
      setPosts(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePosts = (id, updatedPost) => {
    setPosts(posts.map(post => post.id !== id ? post : updatedPost));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const content = {
        "content": e.target["post-content"].value
      };

      const response = await postService.createPost(content);

      setPosts(posts.concat(response));

      // reset field
      e.target["post-content"].value = "";

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  return (
    <>
      <form className={classes.addPost} onSubmit={handleSubmit}>
        <div className={classes.avatar}>
          <img src={ !user.avatarUrl ? UserIcon : user.avatarUrl } alt="user-avatar" />
        </div>
        <div className={classes.more}>
          <textarea className={classes.textarea} name="post-content" rows="4" placeholder="What's happening?">
          </textarea>
          <div className={classes.options}>
            <div className={classes.gallery}>
              <img src={GalleryIcon} alt="gallery-icon" />
            </div>
            <button className={classes.postButton}>
              Post
            </button>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      {
        loading ?
          <Spinner /> :
          posts.length === 0 ? <Nothing /> :
            posts.map(post => <Post key={post.id} post={post} updatePosts={updatePosts} isDetails={false} />)
      }
    </>
  );
}
