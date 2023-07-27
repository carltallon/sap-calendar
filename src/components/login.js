
import './login.css';

// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import React, { useState } from 'react';

const Login = () => {

  

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
    const database = getDatabase(app);
    const auth = getAuth();


  const handleSubmit = (event) => {
    event.preventDefault();
    

    var loginEmail = document.getElementById('loginEmail').current.value;
    var loginPassword = document.getElementById('loginPassword').current.value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                alert('User logged in!');
                // You can now redirect the user to the logged-in area or perform other actions.
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    
  }



  return (
    <div class="wrapper">

    <div class="particle elem1 anim-delay1"></div>
    <div class="particle elem2 anim-delay5"></div>
    <div class="particle elem3 anim-delay3"></div>
    <div class="particle elem4 anim-delay8"></div>
    <div class="particle elem5 anim-delay9"></div>
    <div class="particle elem6 anim-delay2"></div>
    <div class="particle elem7 anim-delay4"></div>
    <div class="particle elem8 anim-delay3"></div>
    <div class="particle elem9 anim-delay10"></div>
    <div class="particle elem8 anim-delay11"></div>
    <div class="particle elem1 anim-delay14"></div>
    <div class="particle elem17 anim-delay18"></div>
    <div class="particle elem16 anim-delay9"></div>
    <div class="particle elem9 anim-delay10"></div>
    <div class="particle elem18 anim-delay11"></div>
    <div class="particle elem13 anim-delay16"></div>
    <div class="particle elem18 anim-delay6"></div>


        <div id="logindiv">

            <div class = "saplogodivlogin"></div>
            
            <h2>WhereAmIAt</h2>
          
              <div onSubmit={handleSubmit}>

                  <input class = "logintext" id="loginEmail"  type = "text"/>
                  <input  class = "logintext" type="password" id="loginPassword"/>

                  <input class = "loginbutton" type="submit" id="loginButton" name="loginbutton" value="Log In" />
                  
              </div>

              <h3>Don't have an account? <a class = "registerlink" href = "/register">Register here</a></h3>
            
        </div>
      </div>
  );
}

export default Login;
