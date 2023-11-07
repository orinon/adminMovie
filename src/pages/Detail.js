import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, child, onValue, update } from "firebase/database";
import { app ,database} from "../firebase";
import { useParams } from "react-router-dom";


const Detail = () => {

    const [data, setData] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        const db = getDatabase(app);
        const dataRef = ref(db, "movieData");
    
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
    <div><h1>Danh Sách Dữ Liệu</h1>
    <table className="table table-bordered table-hover">
      <tbody>
         
            <tr key={id}>
                <td>
                    <h3>ID: {data.id}</h3>
                    <h3>Title: {data.title}</h3>
                    <h3>Actor: {data.actor}</h3>
                    <h3>Age: {data.ageRequired}</h3>
             {/*}   <h3>Actor: {data.actor}</h3>
                    <h3>Actor: {data.actor}</h3>
                    <h3>Actor: {data.actor}</h3>
                    <h3>Actor: {data.actor}</h3>
                    <h3>Actor: {data.actor}</h3>
                    <h3>Actor: {data.actor}</h3>
                    <h3>Actor: {data.actor}</h3> */}
                    
                </td>                                     
            </tr>
          
        </tbody>
    </table></div>
  )
}

export default Detail