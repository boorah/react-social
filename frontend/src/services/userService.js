import axios from "axios";

const BASE_URL = "/api/users";

const createUser = async (user) => {
  const response = await axios.post(BASE_URL, user);
  return response.data;
};

const authUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
};

const userService = {
  createUser,
  authUser
};

export default userService;