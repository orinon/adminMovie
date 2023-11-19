// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, get, set, push } from "firebase/database"; // Thêm các hàm liên quan
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWuj1Otg1vufdQCFiPp3f-NBBYzYbffZ0",
  authDomain: "moviebooking-dd8f1.firebaseapp.com",
  databaseURL: "https://moviebooking-dd8f1-default-rtdb.firebaseio.com",
  projectId: "moviebooking-dd8f1",
  storageBucket: "moviebooking-dd8f1.appspot.com",
  messagingSenderId: "373152859926",
  appId: "1:373152859926:web:97bb5d7c9648e9974bb237",
  measurementId: "G-KR0S9071CZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { app, database, ref, get, set, push,auth }; // Xuất các hàm liên quan
