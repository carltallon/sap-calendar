import './location.css';

import { getAuth  } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

function location() {
  return (

    <div class="locationdiv">
        <h2>Your Location today?</h2>
        <h4>Let your coworkers know where you are working from today!</h4>

        <button onClick = {workingfromhome} class = 'locationbtnathome'></button>

        <button onClick = {workingfromoffice} class = 'locationbtnatoffice'></button>
    </div>
    

  );
}

export default location;


function workingfromhome() {

  const auth = getAuth();
  
  const { uid } = auth.currentUser;
  const currentDate = new Date();
  
  const locationRef = addDoc(collection(db, "Locations"), {
    location: "Home",
    UserID: uid,
    Date: currentDate
  });

}

function workingfromoffice() {

    const auth = getAuth();
    
    const { uid } = auth.currentUser;
    
    const currentDate = new Date();
    const locationRef = addDoc(collection(db, "Locations"), {
      location: "Office",
      UserID: uid,
      Date: currentDate
    });

}