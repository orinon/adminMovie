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
      const imageurl = data.poster;
      return (
        <div className="detail-container">
          <h1>Chi Tiết Dữ Liệu</h1>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>
                  <h3>ID: {id}</h3>
                  <h3>BillID: {data.billID}</h3>
                  <h3>Date: {data.date}</h3>
                  <h3>Day: {data.day}</h3>
                  {/* Các trường dữ liệu khác tương tự ở đây */}
                  <img src={imageurl} alt={`Poster for ${data.title}`} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
}

export default DetailBill