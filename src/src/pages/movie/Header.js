import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css"; // Import tệp CSS

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/" activeClassName="active" exact>
                Trang Chính
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/add" activeClassName="active">
                Thêm Dữ Liệu
              </NavLink>
            </li>
            <li>
            <NavLink className="nav-link" to="/User" activeClassName="active">
                User
              </NavLink>
            </li>
            {/* Thêm các NavLink khác ở đây */}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
