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

const usersathome = [];
const usersinoffice = [];


for (let i = 0; i < locations.length; i++) {

  if (locations[i].location === 'Home'){
    usersathome.push(locations[i].UserID);
  }
  if (locations[i].location === 'Office'){
    usersinoffice.push(locations[i].UserID);
  }   
  
}

const getUsersAtHomeUsernames = async (usersathome) => {
  try {
    const usersAtHomeUsernames = [];

    // Loop through the usersathome array and fetch usernames for each UserID
    for (let i = 0; i < usersathome.length; i++) {
      const userId = usersathome[i];
      const usernamesRef = collection(db, "Usernames");
      const usernamesQuery = query(usernamesRef, where("UserID", "==", userId));
      const querySnapshot = await getDocs(usernamesQuery);

      if (!querySnapshot.empty) {
        // If the user with the given UserID is found, add the username to the array
        querySnapshot.forEach((doc) => {
          const username = doc.data().username;
          usersAtHomeUsernames.push(username);
        });
      } else {
        // If the user with the given UserID is not found, you can add a placeholder value
        console.log('User not found');
      }
    }

    // Now you have an array (usersAtHomeUsernames) with usernames corresponding to the usersathome array
    console.log('Usernames for users at home:', usersAtHomeUsernames);
    return usersAtHomeUsernames;
  } catch (error) {
    console.error('Error fetching usernames:', error);
    return [];
  }
};

const getUsersinOfficeUsernames = async (usersinoffice) => {
  try {
    const usersinOfficeUsernames = [];

    // Loop through the usersathome array and fetch usernames for each UserID
    for (let i = 0; i < usersinoffice.length; i++) {
      const userId = usersinoffice[i];
      const usernamesRef = collection(db, "Usernames");
      const usernamesQuery = query(usernamesRef, where("UserID", "==", userId));
      const querySnapshot = await getDocs(usernamesQuery);

      if (!querySnapshot.empty) {
        // If the user with the given UserID is found, add the username to the array
        querySnapshot.forEach((doc) => {
          const username = doc.data().username;
          usersinOfficeUsernames.push(username);
        });
      } else {
        // If the user with the given UserID is not found, you can add a placeholder value
        console.log('User not found');
      }
    }

    // Now you have an array (usersAtHomeUsernames) with usernames corresponding to the usersathome array
    console.log('Usernames for users at home:', usersinOfficeUsernames);
    return usersinOfficeUsernames;
  } catch (error) {
    console.error('Error fetching usernames:', error);
    return [];
  }
};

var usersinofficeusername = [];
usersinofficeusername = getUsersinOfficeUsernames(usersinoffice);
var usersathomeusername = [];
usersathomeusername = getUsersAtHomeUsernames(usersathome);

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
              {usersinoffice.map(UserID => <button class ="users"> <a>{UserID}</a></button>)}

              <h2>Colleagues at home </h2>
              {usersathome.map(UserID => <button class = "users"> <a>{UserID}</a></button>)}

          </div>

          <div class = "seatingimgdiv"></div>
        </div>
      </div>

      
      :<Loginenforcer />}

    </div>
    
  );
}
