import React, { useState, useEffect } from "react";
import { database ,app} from "../../firebase";
import { ref, get, update ,onValue,getDatabase} from "firebase/database";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Edit.css";
import { useParams,useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
            const videoId = rawData.trailer;
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
  

  const [youtubeVideoId, setYoutubeVideoId] = useState('');

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'trailer') {
      // Nếu người dùng nhập vào ô trailer, xử lý URL và lấy ID của video
      const videoId = extractVideoIdFromUrl(value);
      
      // Cập nhật state chỉ khi người dùng nhập vào ô trailer
      setMovieData({
        ...movieData,
        [name]: videoId,
      });
    } else {
      // Cập nhật state cho các trường khác
      setMovieData({
        ...movieData,
        [name]: value,
      });
    }
  };
  const extractVideoIdFromUrl = (url) => {
    // Extract the video ID from a YouTube URL
    // You can implement your own logic here, for simplicity let's assume it's the last part after '='
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v') || '';
  };
  console.log(movieData.trailer);
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
        navigate(`/detail/${id}`);
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu: " + error.message);
      }
    
  };

  return (
    <div className="container mt-5">
      <h1>Chỉnh sửa dữ liệu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID:
          </label>
          <p className="form-control-static">{movieData.id}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="poster" className="form-label">
            Poster:
          </label>
          <input
            type="text"
            className="form-control"
            name="poster"
            value={movieData.poster}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="backdrop" className="form-label">
          backdrop:
          </label>
          <input
            type="text"
            className="form-control"
            name="backdrop"
            value={movieData.backdrop}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">
            Release Date:
          </label>
          <DatePicker
            value={movieData.releaseDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating:
          </label>
          <input
            type="number"
            className="form-control"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language:
          </label>
          <input
            type="text"
            className="form-control"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre:
          </label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={movieData.genre}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="trailer" className="form-label">
            Trailer:
          </label>
          <input
            type="text"
            className="form-control"
            id="trailer"
            name="trailer"
            value={movieData.trailer}
            onChange={handleInputChange}
            placeholder="Dán URL YouTube vào đây..."
          />
          {movieData.trailer && (
           
            <div className="mt-2">
              <p>Video đã chọn:</p>
              <iframe
                width="100%"
                height="800"
                src={`https://www.youtube.com/embed/${movieData.trailer}`}
                title="YouTube video player"
                frameBorder="4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <input
            type="text"
            className="form-control"
            name="status"
            value={movieData.status}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageRequired" className="form-label">
            Age Required:
          </label>
          <input
            type="text"
            className="form-control"
            name="ageRequired"
            value={movieData.ageRequired}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time:
          </label>
          <input
            type="text"
            className="form-control"
            name="time"
            value={movieData.time}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="censorship" className="form-label">
            Censorship:
          </label>
          <input
            type="text"
            className="form-control"
            name="censorship"
            value={movieData.censorship}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director:
          </label>
          <input
            type="text"
            className="form-control"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="actor" className="form-label">
            Actor:
          </label>
          <input
            type="text"
            className="form-control"
            name="actor"
            value={movieData.actor}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
  );
}

export default EditMovie;
