import './account.css';
import Navbar from '../components/navbar.js';
import Loginenforcer from "../components/loginenforcer.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";






export default function account() {

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
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore(app);

  return (

    <div>
      { user ? 
    
        <div>
          <Navbar />

            <div class ="mainaccountdiv">
                

              <h3>View your Account Details</h3>

              <div class ="accountinfoholder">

                <div class = "accountitem">Email</div>
                <div type = "text" id = "emailholder" class = "accountinfoitem">{ user.email }</div>
                <div class = "accountitem">Unique ID</div>
                <div class = "accountinfoitem">{ user.uid } </div>

              </div>

              <button class = "savebtn" >Save</button>
              <button class = "signoutbtn" onClick={() => auth.signOut()}>Sign out</button>    
            </div>
          </div>


        : <Loginenforcer />}

    </div>

  );
}
