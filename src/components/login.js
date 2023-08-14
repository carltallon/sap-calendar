
import './login.css';

// Import the functions you need from the SDKs you need
import { useNavigate  } from 'react-router-dom';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import database from '../components/loginregisterconfig'; 

const Login = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const [errorMessageState, seterrorMessageState] = useState('No Error');

  const handleSubmit = (event) => {
    event.preventDefault();
    var loginEmail = document.getElementById('loginEmail').value;
    var loginPassword = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                //redirect the user to the logged-in area or perform other actions.
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                alertbox(errorMessage);
            });
  }

  const alertbox = (errorMessage) => {
    var modal = document.getElementById("alertModal");
    modal.style.display = "block";
    seterrorMessageState(errorMessage);
  }

  const closealert = () => {
    var modal = document.getElementById("alertModal");
    modal.style.display = "none";
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

            
            <div id="alertModal" class="modal">
              <div class="modal-content">
                <span onClick={closealert} class="close">&times;</span>
                <p>Oops! Login failed. {errorMessageState}</p>
              </div>
            </div>
            
            <h2>Login</h2>
          
              <form  class= "loginform" onSubmit={handleSubmit}>

                  <input class = "logintext" id="loginEmail"  placeholder="Email" type = "text"/>
                  <input  class = "logintext" type="password" placeholder = "Password" id="loginPassword"/>

                  <input class = "loginbutton" type="submit" id="loginButton" name="loginbutton" value="Let's Go!" />
                  
              </form>

              <h3>Don't have an account? <a class = "registerlink" href = "/register">Register here!</a></h3>
            
        </div>
      </div>
  );
}

export default Login;
