import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navBar">
      <ul>
        <div className="left">
          <li>
            <a className="logo" href="#">
              Logo
            </a>
          </li>
          <li>
            <Link className="logo" to="/principalPage">
              Home
            </Link>
          </li>
        </div>
        <li>
          <a className="dashboard" href="#">
            Mi dashboard
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
