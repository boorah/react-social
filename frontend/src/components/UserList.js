import React, { useEffect, useState } from "react";
import Nothing from "./Nothing";
import User from "./User/User";

export default function UserList({ text, list }) {
  const [users, setUsers] = useState([]);

  const textStyle = {
    color: "var(--primary)",
    display: "inline-block",
    marginLeft: "12px",
    marginBottom: "20px",
    fontWeight: "500",
    fontSize: "25px",
    textDecoration: "underline",
    textDecorationThickness: "4px"
  };

  useEffect(() => {
    setUsers(list);
  }, [list]);

  const updateUsers = (id) => {
    const updatedList = users.map(
      (user) => {
        return (
          user.id !== id ?
            user :
            {
              ...user,
              isFollowing: !user.isFollowing
            }
        );
      }
    );

    setUsers(updatedList);
  };

  return (
    <div>
      <span style={textStyle}>{text}</span>
      {
        users.length === 0 ?
          <Nothing /> :
          users.map(
            user => {
              return <User key={user.id} user={user} updateUsers={updateUsers} />;
            }
          )
      }
    </div>
  );
}
