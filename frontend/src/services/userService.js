import axios from "axios";

const BASE_URL = "/api/users";

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

const createUser = async (user) => {
  const response = await axios.post(BASE_URL, user);
  return response.data;
};

const updateUser = async (info) => {
  const config = getConfig();
  const response = await axios.put(`${BASE_URL}/update`, info, config);

  return response.data;
};

const uploadImage = async (formData) => {
  const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);

  return response.data;
};

const authUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
};

const getUserDetails = async (username) => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/${username}`, config);

  return response.data;
};

const getUsersToFollow = async () => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/follow`, config);

  return response.data;
};

const toggleFollow = async (id, isFollowing) => {
  const config = getConfig();
  const response = await axios.put(`${BASE_URL}/follow/${id}`, { isFollowing }, config);

  return response.data;
};

const getUserFollowers = async (username) => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/${username}/followers`, config);

  return response.data;
};

const getUserFollowing = async (username) => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/${username}/following`, config);

  return response.data;
};

const getPosts = async (username, type) => {
  const config = getConfig();
  const response = await axios.get(`${BASE_URL}/${username}/${type}`, config);

  return response.data;
};

const userService = {
  createUser,
  updateUser,
  uploadImage,
  authUser,
  getUserDetails,
  getUsersToFollow,
  getUserFollowers,
  getUserFollowing,
  toggleFollow,
  getPosts
};

export default userService;