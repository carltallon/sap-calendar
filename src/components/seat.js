import './seat.css';

import Navbar from "../components/navbar.js";
import Loginenforcer from "../components/loginenforcer.js"

import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

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

const locations = [];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();



const querySnapshot = await getDocs(collection(db, "Locations"));
querySnapshot.forEach((doc) => {
  locations.push(doc.data());
});
console.log(locations);

const usersathome = [];
const usersinoffice = [];


for (let i = 0; i < locations.length; i++) {

  if (locations[i].location == 'Home'){
    usersathome.push(locations[i].UserID);
  }
  if (locations[i].location == 'Office'){
    usersinoffice.push(locations[i].UserID);
  }   
  
}


export default function Seat() {

  const[user] = useAuthState(auth);

  return (
    <div>

      { user ? 
      <div>
        <Navbar />
        <div class = "mainseatdiv">
          <div class ="seatdiv">

              <h2>Seating</h2>

              <h2>Colleagues in Office</h2>
              {usersinoffice.map(UserID => <button> <a>{UserID}</a></button>)}

              <h2>Colleagues at home </h2>
              {usersathome.map(UserID => <button> <a>{UserID}</a></button>)}

          </div>

          <div></div>
        </div>
      </div>

      
      :<Loginenforcer />}

    </div>
    
  );
}
