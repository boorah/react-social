import React, { useState, useEffect } from "react";
import UserList from "../../components/UserList";
import userService from "../../services/userService";
import postService from "../../services/postService";
import Post from "../../components/Post/Post";
import Nothing from "../../components/Nothing";

export default function Explore() {

  const [explore, setExplore] = useState(null);

  const updatePosts = (id, updatedPost) => {
    setExplore({
      ...explore,
      posts: explore.posts.map(post => post.id !== id ? post : updatedPost)
    });
  };

  const fetchUsers = async () => {

    try {
      const users = await userService.getUsersToFollow();
      const posts = await postService.getUndiscoveredPosts();

      setExplore({
        users,
        posts
      });

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {
        explore &&
        <>
          {
            explore.users.length === 0 ?
              null :
              <>
                <UserList
                  text="Explore"
                  list={explore.users} />
                <div className="divider"></div>
              </>
          }
          {
            explore.posts.length === 0 ?
              <Nothing /> :
              explore.posts.map(
                post => <Post key={post.id} post={post} updatePosts={updatePosts} isDetails={false} />
              )
          }
        </>
      }
    </div>
  );
}
