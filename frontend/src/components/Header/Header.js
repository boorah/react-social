import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Logout from "../../assets/logout.png";
import Exlpore from "../../assets/explore.png";
import "./Header.css";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    
    // remove from localStorage
    window.localStorage.removeItem("loggedInUser");

    setUser(null);

  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar__link">
          <h1 className="navbar__logo">react.social</h1>
        </Link>
        {
          !user ? null :
            <div className="navbar__icons">
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
