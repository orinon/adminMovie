import React, { useState, useEffect } from "react";
import { database ,app} from "../../firebase";
import { ref, update ,onValue,getDatabase} from "firebase/database";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./Edit.css";
import { useParams,useNavigate } from "react-router-dom";


function EditMovie() {
  
  const [movieData, setMovieData] = useState({
    id: null, // Thêm id vào dữ liệu, ban đầu để giá trị null
    poster: "",
    title: "",
    language: "",
    genre: [],
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
  const genres = [
    { value: "Phiêu lưu", label: "Phiêu lưu" },
    { value: "Tưởng tượng", label: "Tưởng tượng" },
    { value: "Hoạt hình", label: "Hoạt hình" },
    { value: "Drama", label: "Drama" },
    { value: "Kinh dị", label: "Kinh dị" },
    { value: "Hành động", label: "Hành động"},
    { value: "Hài kịch", label: "Hài kịch" },
    { value: "Lịch sử", label: "Lịch sử" },
    { value: "Miền tây", label: "Miền tây" },
    { value: "Giật gân", label: "Giật gân"},
    { value:  "Tội phạm", label:  "Tội phạm" },
    { value: "Tài liệu", label: "Tài liệu"},
    { value:  "Khoa học viễn tưởng", label: "Khoa học viễn tưởng"},
    { value: "Bí ẩn", label:  "Bí ẩn"},
    { value:  "Gia đình", label: "Gia đình"},
    { value:  "Nhạc", label:  "Nhạc"},
    { value:   "Lãng mạn", label: "Lãng mạn"},
    { value:  "Chiến tranh", label: "Chiến tranh"},
    { value:  "Truyền hình", label:  "Truyền hình"},
  ];
  const {id} =useParams();
  const [selectedGenres, setSelectedGenres] = useState([]);
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
            const genreData = dataById.genre || []; // Thiết lập giá trị mặc định nếu là null hoặc không tồn tại
            setMovieData({ ...dataById, genre: genreData });
            
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
        genre: [],
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
  const handleInputChangeGenre = (selectedGenres) => {
    setMovieData({
      ...movieData,
      genre: selectedGenres.map((genre) => genre.value),
    });
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

    if (errorMessages.length > 0) {
      // Hiển thị thông báo với danh sách lỗi
      toast.error(errorMessages.join("\n"));
    } else {
      try {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn cập nhật dữ liệu không?");

        if (userConfirmed) {
          await update(dbRef, movieData);
        toast.success("Cập nhật dữ liệu thành công!");
        navigate(`/`);
        }
        else {
          toast.error("Cập nhật bị hủy bởi người dùng");
        }
        
      } catch (error) {
        toast.error("Lỗi khi cập nhật dữ liệu: " + error.message);
      }
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
        {/* <div className="mb-3">
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
        </div> */}
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre:
          </label>
          <Select
            isMulti
            options={genres}
            value={genres.filter((g) => movieData.genre.includes(g.value))}
            onChange={handleInputChangeGenre}
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
