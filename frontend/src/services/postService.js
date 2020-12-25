import axios from "axios";

const BASE_URL = "/api/posts";

const getConfig = () => {
  const parsed = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const token = `Bearer ${parsed.token}`;

  return ({
    headers: {
      "Authorization": token
    }
  }
  );
};

const createPost = async (content) => {
  const config = getConfig();
  const response = await axios.post(BASE_URL, content, config);
  
  return response.data;
};

const getUserFeed = async () => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/feed`, config);
  return response.data;
};

const getUndiscoveredPosts = async () => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/explore`, config);

  return response.data;
};

const toggleLike = async (id, isLiked) => {
  const config = getConfig();
  const response = await axios.put(`${BASE_URL}/likes/${id}`, { isLiked }, config);

  return response.data;
};

const getPostDetails = async (id) => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/${id}`, config);

  return response.data;
};

const addComment = async (id, comment) => {
  const config = getConfig();
  const response = await axios.put(`${BASE_URL}/comments/${id}`, { comment }, config);

  return response.data;
};

const postService = {
  createPost,
  getUserFeed,
  toggleLike,
  getPostDetails,
  getUndiscoveredPosts,
  addComment
};

export default postService;