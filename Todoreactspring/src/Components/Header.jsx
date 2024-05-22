import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/Auth";

function Header() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const username = authContext.username;
  console.log(authContext);
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <Link to="/" className="navbar-brand">
              <h1>Singh.</h1>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {isAuthenticated && (
                    <Link to={`/welcome/${username}`} className="nav-link">
                      Home
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {isAuthenticated && (
                    <Link to="/todos" className="nav-link">
                      Todo
                    </Link>
                  )}
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  {!isAuthenticated && (
                    <Link to="/" className="nav-link">
                      Login
                    </Link>
                  )}
                </li>

                <li className="nav-item">
                  {isAuthenticated && (
                    <Link
                      to="/logout"
                      className="nav-link"
                      onClick={() => {
                        authContext.logout();
                      }}
                    >
                      Logout
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
