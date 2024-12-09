import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.svg';
import { useMyContext } from "./store/ContextApi";

const Header = () => {
  const { token, setToken, setCurrentUser, setIsAdmin } = useMyContext();
  const navigate = useNavigate();

  // Lógica para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    localStorage.removeItem("balotario");
    localStorage.removeItem("approvedDeletes");
    localStorage.removeItem("approvedList");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="navBar">
      <ul>
        <div className="left">
          <li>
            <Link className="logo" to="/principalPage">
              <img src={Logo} alt="logo"/>
            </Link>
          </li>
          <li>
            <Link className="home" to="/principalPage">
              Home
            </Link>
          </li>
        </div>

        {token ? (
          // Mostrar botón de logout si el usuario está logueado
          <li>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Cerrar sesión
            </button>
          </li>
        ) : (
          <li>
            <Link className="login" to="/">
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
