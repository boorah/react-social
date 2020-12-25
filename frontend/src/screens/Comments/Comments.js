import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import classes from "./Comments.module.css";
import postService from "../../services/postService";

export default function Comments() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const comment = e.target.comment.value;
      const response = await postService.addComment(id, comment);

      e.target.comment.value = "";
      setPost(response);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    const getPostDetails = async () => {

      try {
        const response = await postService.getPostDetails(id);
        setPost(response);
      } catch (error) {
        console.log(error);
      }

    };
    getPostDetails();
  }, [id]);

  return (
    <>
      { post ? <Post post={post} isDetails={true} /> : null}
      <div className="divider"></div>
      {
        post ?
          post.comments.map(comment => <Comment key={comment.id} {...comment} />)
          : null
      }
      <form className={classes.commentForm} onSubmit={handleAddComment}>
        <input name="comment" type="text" placeholder="Add comment" />
        <button className={classes.commentButton}>Comment</button>
      </form>
    </>
  );
}
