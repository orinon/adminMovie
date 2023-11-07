import React, { useState, useEffect } from "react";
import { database } from "../firebase"; // Import cấu hình Firebase và database
import { ref, push } from "firebase/database";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker"; // Import date picker library
import "react-datepicker/dist/react-datepicker.css";
import { onChildAdded } from "firebase/database";
import "./AddData.css";

function AddMovie() {
  const [movieData, setMovieData] = useState({
    id: null, // Thêm id vào dữ liệu, ban đầu để giá trị null
    poster: "",
    title: "",
    language: "",
    genre: "",
    rating: 0, // Giới hạn rating từ 0
    description: "",
    releaseDate: new Date(), // Giá trị mặc định là ngày hiện tại
    trailer: "",
    status: "",
    ageRequired: "",
    time: "",
    censorship: "",
    director: "",
    actor: "",
  });

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    // Tìm ID lớn nhất hiện tại trong cơ sở dữ liệu
    const dbRef = ref(database, "Movie");
    onChildAdded(dbRef, (snapshot) => {
      // Cập nhật currentId với giá trị lớn nhất + 1
      const maxId = parseInt(snapshot.key) || 0;
      setCurrentId(maxId + 1);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setMovieData({
      ...movieData,
      releaseDate: date,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !movieData.title ||
      !movieData.poster ||
      !movieData.description ||
      movieData.rating < 0 ||
      movieData.rating > 10
    ) {
      // Kiểm tra nếu có trường dữ liệu trống hoặc rating không hợp lệ
      toast.error("Vui lòng điền đầy đủ thông tin và rating từ 0 đến 10.");
    } else {
      try {
        const dbRef = ref(database, "Movie");
        const newId = currentId;
  
        // Thêm dữ liệu mới vào Firebase
        push(dbRef, { ...movieData, id: newId }, (error) => {
          if (error) {
            toast.error("Lỗi khi thêm dữ liệu: " + error.message);
          } else {
            toast.success("Thêm dữ liệu thành công! ID: " + newId);
            console.log("Data added successfully. ID: " + newId);
  
            // Đặt lại giá trị của biểu mẫu sau khi thêm dữ liệu thành công
            setMovieData({
              id: null,
              poster: "",
              title: "",
              language: "",
              genre: "",
              rating: 0,
              description: "",
              releaseDate: new Date(),
              trailer: "",
              status: "",
              ageRequired: "",
              time: "",
              censorship: "",
              director: "",
              actor: "",
            });
  
            // Tăng giá trị của currentId lên 1 cho lần thêm dữ liệu tiếp theo
            setCurrentId(newId + 1);
          }
        });
      } catch (error) {
        toast.error("Lỗi khi thêm dữ liệu: " + error.message);
      }
    }
  };
  

  return (
    <div className="add-data-form">
      <h1>Thêm Dữ Liệu Phim</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Poster:</label>
          <input
            type="text"
            name="poster"
            value={movieData.poster}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Release Date:</label>
          <DatePicker
            selected={movieData.releaseDate}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            min="0"
            max="10"
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={movieData.genre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Trailer:</label>
          <input
            type="text"
            name="trailer"
            value={movieData.trailer}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={movieData.status}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Age Required:</label>
          <input
            type="text"
            name="ageRequired"
            value={movieData.ageRequired}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="text"
            name="time"
            value={movieData.time}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Censorship:</label>
          <input
            type="text"
            name="censorship"
            value={movieData.censorship}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Actor:</label>
          <input
            type="text"
            name="actor"
            value={movieData.actor}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddMovie;
