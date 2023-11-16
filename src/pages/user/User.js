import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"; // Điều chỉnh đường dẫn tương ứng với cấu trúc của dự án bạn

function NguoiDung() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Lấy thông tin người dùng từ Firebase Authentication
        const { uid, email, displayName, photoURL } = user;
  
        // Kiểm tra xem dữ liệu có bị null hay không
        if (uid) {
          // Set state với thông tin người dùng
          setUserData({
            uid,
            
            // Các trường dữ liệu khác có thể được thêm vào đây
          });
        } else {
          console.log("Dữ liệu người dùng là null.");
        }
      }
    };
  
    fetchUserData();
  }, [user]);
  

  return (
    <div>
      <h2>Hello</h2>
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>UID: {userData.uid}</p>
          <p>Email: {userData.email}</p>
          <p>Display Name: {userData.displayName}</p>
          <p>Photo URL: {userData.photoURL}</p>
        </div>
      )}
    </div>
  );
}

export default NguoiDung;
