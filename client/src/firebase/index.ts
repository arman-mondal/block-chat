import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJlRB37OxqD17gUvHzrYE7RObxUwc8UAg",
    authDomain: "chatapp-c6126.firebaseapp.com",
    databaseURL: "https://chatapp-c6126-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatapp-c6126",
    storageBucket: "chatapp-c6126.firebasestorage.app",
    messagingSenderId: "790796855114",
    appId: "1:790796855114:web:677be863a19f77b91583b3",
    measurementId: "G-EQMEWQ32WM"
  };

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
