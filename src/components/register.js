import './register.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import React, { useState } from 'react';

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


//FUNCTION BEGINS
const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const SignUp = (event) => {
    event.preventDefault();

    // access the email and password from formData state
    const { email, password, username } = formData;

    // handle form submission here, for example, send data to the server
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            });
            alert('User created!');
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    
  };


  return (

    <div>

        <div class ="registerdiv">
            

            <h2>Register for an account</h2>  


            <form class ="registerform" onSubmit={SignUp}>
              
              <input class = "usernameinput" value={formData.username} onChange={handleInputChange} type="text" id="username" name="username" placeholder="Username" />
              <input class = "emailinput" value={formData.email} onChange={handleInputChange} type="text" id="email" name="email" placeholder="E-mail" />
              <input class = "passwordinput" value={formData.password} onChange={handleInputChange} type="password" id="password" name="password" placeholder="Password" />

              <input type="submit" id="signUp" name="signUp" value="Register" />

            </form>

        </div>
    </div>
    

  );
}


export default Register;


