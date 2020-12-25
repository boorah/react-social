import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nothing from "./Nothing";
import Post from "./Post/Post";
import userService from "../services/userService";
import Spinner from "./Spinner/Spinner";

export default function Posts({ type }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await userService.getPosts(username, type);
        setLoading(false);
        setPosts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [username, type]);

  const updatePosts = (id, updatedPost) => {
    setPosts(posts.map(post => post.id !== id ? post : updatedPost));
  };

  return (
    <>
      {
        loading ?
          <Spinner /> :
          (
            posts.length === 0 ?
              <Nothing /> :
              posts.map(
                post => <Post key={post.id} post={post} updatePosts={updatePosts} isDetails={false} />
              )
          )
      }
    </>
  );
}
