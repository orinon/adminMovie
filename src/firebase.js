// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, get, set, push } from "firebase/database"; // Thêm các hàm liên quan
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtyTC90zQ4L9CfQExALFTfKJjzzbiGgiw",
  authDomain: "movie-a5b07.firebaseapp.com",
  databaseURL: "https://movie-a5b07-default-rtdb.firebaseio.com",
  projectId: "movie-a5b07",
  storageBucket: "movie-a5b07.appspot.com",
  messagingSenderId: "646521216474",
  appId: "1:646521216474:web:27c209818092e46839f4e3",
  measurementId: "G-BMEKB7G11D"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { app, database, ref, get, set, push,auth }; // Xuất các hàm liên quan
