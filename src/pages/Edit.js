import React, { useState, useEffect } from "react";
import { database ,app} from "../firebase";
import { ref, get, update ,onValue,getDatabase} from "firebase/database";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Edit.css";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";

function EditMovie({}) {
  
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
  const {id} =useParams();

  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, "movieData");

    onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          // Lọc dữ liệu theo id từ useParams
          const dataById = rawData[id];
          if (dataById) {
            setMovieData(dataById);
          } else {
            console.log("No data available for this id");
          }
        } else {
          console.log("No data available");
        }
      });
    return()=>{
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
    }
  }, [id]);


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
   
      const dbRef = ref(database, `movieData/${id}`);
      try {
        await update(dbRef, movieData);
        toast.success("Cập nhật dữ liệu thành công!");
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu: " + error.message);
      }
    
  };

  return (
    <div className="add-data-form">
      <h1>Chỉnh sửa dữ liệu</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <tr>ID: {movieData.id}</tr>
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
            value={movieData.releaseDate}
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
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default EditMovie;
