import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";
import { useParams } from "react-router-dom";


const Detail = () => {

    const [data, setData] = useState([]);
    const {title} = useParams();
    
    // useEffect(() => {
    //     const db = getDatabase(app);
    //     const dataRef = ref(db, "bills");
    
    //     onValue(dataRef, (snapshot) => {
    //         if (snapshot.exists()) {
    //           const rawData = snapshot.val();
    //           // Lọc dữ liệu theo id từ useParams
    //           const dataByTitle  = rawData[title];
    //           console.log(title)
    //           if (dataByTitle) {
    //             const { date, email, displayName, movieDetail, numberOfSeats, selectedSeats,time,total } = dataByTitle;
    //             console.log(date)
    //             if(selectedSeats)
    //             {
    //               const selectedSeatsProps = Object.keys(selectedSeats);

    //               // Tạo một đối tượng mới để chứa tất cả thuộc tính con của subData5
    //               const selectedSeatsObj = {};
    //               selectedSeatsProps.forEach((prop) => {
    //                 selectedSeatsObj[prop] = selectedSeats[prop];
    //               });
                  
    //               setData({
    //                 date, email, displayName, movieDetail, numberOfSeats, selectedSeats:selectedSeatsObj,time,total
    //               });

    //               console.log(title)
    //             }
    //           } else {
    //             console.log("No data available for this id");
    //           }
    //         } else {
    //           console.log("No data available");
    //         }
    //       });
    //     return()=>{
    //         setData([]);
    //     }
    //   }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, "bills");

        onValue(dataRef, (snapshot) => {
          if (snapshot.exists()) {
            const rawData = snapshot.val();
            // Lọc dữ liệu theo id từ useParams
            const dataByTitle = rawData[title];
            console.log(title)

            if (snapshot.exists()) {
              const rawData = snapshot.val();
              const dataByTitle = rawData[title];

              if (dataByTitle) {
                setData(dataByTitle);
                console.log("Data fetched successfully:", dataByTitle);
              } else {
                console.log("No data available for this title");
              }
            } else {
              console.log("No data available");
            }
          } 
        })
      }catch (error) {
            console.error("Error fetching data: ", error.message);
          }


          fetchData();
        }}, [title] );
      
     console.log(JSON.stringify(data, null, 2))
      return (
        <div>
      <h1>Title: {title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
      );
}

export default Detail