import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserList from "./UserList";
import userService from "../services/userService";

export default function Followers() {
  const [users, setUsers] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await userService.getUserFollowers(username);
        setUsers(response);
      } catch (error) {
        console.log(error);
      }

    };

    fetchUsers();
  }, [username]);

  return (
    <>
      {
        <UserList
          text="Followers"
          list={users} />
      }
    </>
  );
}
