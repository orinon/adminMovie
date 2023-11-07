// Header.js

import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css"; // Import tệp CSS

function Header() {
  return (
    <header>
      <div className="logo">Admin</div> {/* Tựa "Admin" như logo */}
      <nav>
        <ul>
          <li>
            <NavLink to="/">Trang Chính</NavLink>
          </li>
          <li>
            <NavLink to="/add">Thêm Dữ Liệu</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
