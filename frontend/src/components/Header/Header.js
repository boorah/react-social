import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import User from "../../assets/user-profile.png";
import Logout from "../../assets/logout.png";
import Exlpore from "../../assets/explore.png";
import classes from "./Header.module.css";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    
    // remove from localStorage
    window.localStorage.removeItem("loggedInUser");

    history.push("/");

    setUser(null);

  };

  return (
    <header>
      <nav className={classes.navbar}>
        <Link to="/" className={classes.navbarLink}>
          <h1 className={classes.navbarLogo}>react.social</h1>
        </Link>
        {
          !user ? null :
            <div className={classes.navbarIcons}>
              <Link to={`/profile/${user.username}`}>
                <img src={User} alt="user-icon" />
              </Link>
              <Link to="/explore">
                <img src={Exlpore} alt="explore-icon" />
              </Link>
              <div>
                <img src={Logout} alt="logout-icon" onClick={handleLogout}/>
              </div>
            </div>
        }
      </nav>
    </header>
  );
}
