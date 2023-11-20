import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";
import { useParams } from "react-router-dom";
import "./DetailBill.css";

const DetailBill = () => {

    const [data, setData] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        const db = getDatabase(app);
        const dataRef = ref(db, "bills");
    
        onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
              const rawData = snapshot.val();
              // Lọc dữ liệu theo id từ useParams
              const dataById = rawData[id];
              if (dataById) {
                setData(dataById);
              } else {
                console.log("No data available for this id");
                
              }
            } else {
              console.log("No data available");
            }
          });
        return()=>{
            setData([]);
        }
      }, [id]);
      
      return (
        <div className="container mt-5">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Chi Tiết Bill</h1>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-hover">
                <tbody>
                  <tr>
                    <td>
                      {/* <div className="detail-item">
                        <h3>ID:</h3>
                        <p>{id}</p>
                      </div> */}
                      <div className="detail-item">
                        <h3>BillID:</h3>
                        <p>{data.billID}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Phim:</h3>
                        <p>{data.movieDetail}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Email:</h3>
                        <p>{data.email}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Ngày:</h3>
                        <p>{data.date}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Số ghế chọn:</h3>
                        <p>{data.numberOfSeats}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Chi tiết ghế chọn:</h3>
                        <p>{data.selectedSeats.join(", ")}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Khung giờ:</h3>
                        <p>{data.time}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Số tiền:</h3>
                        <p>{data.total}</p>
                      </div>
                      {/* Thêm các trường dữ liệu khác tương tự ở đây */}
                    
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
}

export default DetailBill