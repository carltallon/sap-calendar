import './account.css';
import Navbar from '../components/navbar.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { useAuthState } from 'react-firebase-hooks/auth';

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
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;

    alert(displayName);
  }

  return (

    <div>

        <Navbar />
        <div class ="mainaccountdiv">
            

          <h3>Manage your Account</h3>

          <div class ="accountinfoholder">

            <div class = "accountitem">Name</div>
            <input class = "accountinfoitem"></input>
            <div class = "accountitem">Email</div>
            <input class = "accountinfoitem"></input>
            <div class = "accountitem">Password</div>
            <input class = "accountinfoitem"></input>

          </div>

          <button class = "signoutbtn" onClick={() => auth.signOut()}>Sign out</button>
            
        </div>
    </div>
    

  );
}
