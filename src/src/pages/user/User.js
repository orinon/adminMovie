// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase"; // Điều chỉnh đường dẫn tương ứng với cấu trúc của dự án bạn
// import { getAuth, listUsers, connectAuthEmulator } from "firebase/auth";

// function User() {
//   const [user, loading, error] = useAuthState(auth);
//   const [userData, setUserData] = useState(null);

//   //const auth = admin.auth();

// // List all users
// auth.listUsers()
//   .then((listUsersResult) => {
//     listUsersResult.users.forEach((userRecord) => {
//       console.log('user', userRecord.toJSON());
//     });
//   })
//   .catch((error) => {
//     console.error('Error listing users:', error);
//   });

//   return (
//     <div>
//       <h2>Hello</h2>
      
//     </div>
//   );
// }

// export default User;
