// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { app } from "./firebase"; // Import cấu hình Firebase từ tệp firebase.js
import Main from "./pages/movie/Main";
import AddData from "./pages/movie/AddData";
import Edit from "./pages/movie/Edit";
import Header from "./pages/movie/Header"; // Import thành phần Header
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./pages/movie/Detail";
import User from "./pages/user/User";

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Hiển thị header */}
        <ToastContainer /> {/* Hiển thị thông báo */}
        <Routes>
        <Route path="/" element={<Main firebaseApp={app} />} />
        <Route path="/add" element={<AddData firebaseApp={app} />} />
        <Route path="/edit/:id" element={<Edit firebaseApp={app} />} />
        <Route path="/detail/:id" element={<Detail firebaseApp={app}/>} />
        <Route path="/User" element={<User firebaseApp={app}/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
