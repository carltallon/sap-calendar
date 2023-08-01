import './home.css';

import Login from "../components/login.js";
import SAPCalendar from "../components/sapcalendar.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';



const firebaseConfig = {
    // Your Firebase configuration here
    apiKey: "AIzaSyCf8LYQfeurGdAvB5Uu_eeQIVoWyl6Z3IY",
    authDomain: "test-30bf7.firebaseapp.com",
    databaseURL: "https://test-30bf7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-30bf7",
    storageBucket: "test-30bf7.appspot.com",
    messagingSenderId: "381008086519",
    appId: "1:381008086519:web:f5fce4c537e56933ca1af2",
    measurementId: "G-PMRE4PWB4B"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);
const auth = getAuth();

export default function Home() {

  const[user] = useAuthState(auth);

  return (

    <div>
      { user ? <SAPCalendar />:<Login />}
    </div>
    
  );
}

