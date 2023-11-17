import React, { useEffect, useState } from "react";
import { database } from "../../firebase"; // Import cấu hình Firebase và database
import { ref, push, onValue } from "firebase/database";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker"; // Import date picker library
import "react-datepicker/dist/react-datepicker.css";

import "./AddData.css";
import "bootstrap/dist/css/bootstrap.min.css";


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

  const extractYouTubeVideoId = (url) => {
    const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|^https?:\/\/youtu.be\/)([^"&?\/\s]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : '';
  };

  const [maxId, setMaxId] = useState();
  const dbRef = ref(database, "movieData");
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      const movies = Object.values(data);
      console.log(movies)
      let num = 0
      movies.forEach(element => {
        num++;
        setMaxId(num)
      });


    });
  }, [maxId])


  const handleDateChange = (date) => {
    setMovieData({
      ...movieData,
      releaseDate: date,
    });
  };
  const [youtubeVideoId, setYoutubeVideoId] = useState('');

  // ...

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'trailer') {
      // Nếu người dùng nhập vào ô trailer, xử lý URL và lấy ID của video
      const videoId = extractYouTubeVideoId(value);
      setYoutubeVideoId(videoId);
    }

    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  // ...
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Tạo mảng để lưu trạng thái của từng điều kiện
    let errorMessages = [];

    if (!movieData.title) {
      errorMessages.push("Vui lòng nhập tiêu đề.");
    }

    if (!movieData.poster) {
      errorMessages.push("Vui lòng nhập đường dẫn poster.");
    }

    if (!movieData.description) {
      errorMessages.push("Vui lòng nhập mô tả.");
    }

    if (movieData.rating < 0 || movieData.rating > 10) {
      errorMessages.push("Rating phải nằm trong khoảng từ 0 đến 10.");
    }

    if (!movieData.backdrop) {
      errorMessages.push("Vui lòng nhập đường dẫn backdrop.");
    }

    if (!movieData.trailer) {
      errorMessages.push("Vui lòng nhập đường dẫn trailer.");
    }
    // if(){

    // }
    // Kiểm tra nếu có lỗi
    if (errorMessages.length > 0) {
      // Hiển thị thông báo với danh sách lỗi
      toast.error(errorMessages.join("\n"));
    } else {
      try {
        const dbRef = ref(database, "movieData");
        const newId = maxId + 1;

        const userConfirmed = window.confirm("Bạn có chắc chắn muốn thêm dữ liệu không?");

        if (userConfirmed) {
          
          
          const updatedMovieData = { ...movieData, trailer: youtubeVideoId };
  
          toast.success("Thêm thành công");
          // Thêm dữ liệu mới vào Firebase
          push(dbRef, { ...updatedMovieData, id: newId })


          // Đặt lại giá trị của biểu mẫu sau khi thêm dữ liệu thành công
          setMovieData({
            id: null,
            poster: "",
            title: "",
            language: "",
            backdrop:"",
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


        } else {
          toast.error("Thêm bị hủy bởi người dùng");
        }
      } catch (error) {
        toast.error("Lỗi khi thêm dữ liệu: " + error.message);
      }
    }
  };


  return (
    <div className="container mt-5">
      <h1>Thêm Dữ Liệu Phim</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="poster" className="form-label">
            Poster:
          </label>
          <input
            type="text"
            className="form-control"
            id="poster"
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
            id="title"
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
            selected={movieData.releaseDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating:
          </label>
          <input
            // type="number"
            className="form-control"
            id="rating"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            min="0"
            max="10"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language:
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
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
            id="genre"
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
            id="description"
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="mb-3">
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
          />
        </div> */}
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
          {youtubeVideoId && (
            <div className="mt-2">
              <p>Video đã chọn:</p>
              <iframe
                width="100%"
                height="800"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
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
            id="status"
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
            id="ageRequired"
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
            id="time"
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
            id="censorship"
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
            id="director"
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
            id="actor"
            name="actor"
            value={movieData.actor}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm
        </button>
      </form>
    </div>
  );
}
export default AddMovie;
