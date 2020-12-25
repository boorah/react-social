import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserIcon from "../../assets/man.png";
import SettingsIcon from "../../assets/settings.png";
import userService from "../../services/userService";
import Posts from "../../components/Posts";
import FollowButton from "../../components/FollowButton/FollowButton";
import classes from "./Profile.module.css";


export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(true);

  const parsedDate = user ? new Date(user.joined).toLocaleString("default", { month: "short", day: "numeric" }) : null;

  const toggleStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textDecorationThickness: "4px"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black"
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const updateUser = (id) => {
    setUser({
      ...user,
      isFollowing: !user.isFollowing
    });
  };


  useEffect(() => {
    const fetchUserDetails = async () => {

      try {
        const response = await userService.getUserDetails(username);
        setUser(response);
      } catch (error) {
        console.log(error);
      }

    };
    fetchUserDetails();
  }, [username]);

  return (
    !user ? null :
      <div className={classes.profile}>
        <div className={classes.info}>
          <div className={classes.avatar}>
            <img src={!user.avatarUrl ? UserIcon : user.avatarUrl} alt="user-avatar" />
          </div>
          <div className={classes.more}>
            <div className={classes.user}>
              <div>
                <p className={classes.name}>{user.name}</p>
                <p className={classes.date}>Joined on {parsedDate}</p>
              </div>
              {
                user.isMe ?
                  <Link to={`/profile/${username}/update`} className={classes.settingsIcon}>
                    <img src={SettingsIcon} alt="settings-icon" />
                  </Link> :
                  <FollowButton
                    id={user.id}
                    isMe={user.isMe}
                    isFollowing={user.isFollowing}
                    update={updateUser} />
              }
            </div>
            <div className={classes.stats}>
              <div className={classes.stat}>
                <span className={classes.count}>{user.posts.length}</span>
                <span>Posts</span>
              </div>
              <Link to={`/profile/${username}/followers`} className={classes.stat} style={linkStyle}>
                <span className={classes.count}>{user.followers.length}</span>
                <span>Followers</span>
              </Link>
              <Link to={`/profile/${username}/following`} className={classes.stat} style={linkStyle}>
                <span className={classes.count}>{user.following.length}</span>
                <span>Following</span>
              </Link>
            </div>
          </div>
        </div>
        <p className={classes.about}>
          {user.about}
        </p>
        <div className={classes.toggle}>
          <span style={visible ? toggleStyle : null} onClick={toggleVisible}>liked</span>
          <span style={!visible ? toggleStyle : null} onClick={toggleVisible}>posts</span>
        </div>
        <Posts type={visible ? "liked" : "posts"} />
      </div>
  );
}
