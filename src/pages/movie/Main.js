import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, child, onValue, update, remove } from "firebase/database";
import { app } from "../../firebase"; // Đảm bảo rằng đường dẫn đúng đến tệp firebase.js của bạn
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate thay cho useHistory
import "./Main.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { id } from "date-fns/locale";

function Main() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Sử dụng useNavigate

  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, "movieData");

    onValue(dataRef,(snapshot) => {
        const data = snapshot.val();
        
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
    return()=>{
        setData({});
    }
  }, []);

  const handleEdit = (id) => {
    // Điều hướng đến trang chỉnh sửa với id được chọn
    navigate(`/edit/${id}`); // Sử dụng navigate thay cho history.push
  };

  const handleDelete = (id) => {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa mục này?");
  
    if (isConfirmed) {
      // Thực hiện xóa dữ liệu từ Firebase Realtime Database
      const db = getDatabase(app);
      const dataRef = ref(db, `movieData/${id}`);
      remove(dataRef, id)
        .then(() => {
          console.log("Dữ liệu đã bị xóa thành công");
        })
        .catch((error) => {
          console.error("Xóa dữ liệu không thành công: " + error.message);
        });
    }
  };
  

  const handleDetail = (id) => {
    // Điều hướng đến trang chi tiết với id được chọn
    navigate(`/detail/${id}`); // Sử dụng navigate thay cho history.push
  };

  return (
    <div className="data-list-container">
      <h1>Danh Sách Dữ Liệu</h1>
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>Number</th>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{id}</td>
              <td>{data[id].title}</td>
              <td>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => handleEdit(id)}
                >
                  <FontAwesomeIcon icon="edit" /> Edit
                </button>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={() => handleDelete(id)}
                >
                  <FontAwesomeIcon icon="trash" /> Delete
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleDetail(id)}
                >
                  <FontAwesomeIcon icon="info-circle" /> Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Main;
