import './register.css';
import {  set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import database from '../components/loginregisterconfig'; 
import { useNavigate  } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../components/firebaseconfig'; 

const auth = getAuth();

//FUNCTION BEGINS
const Register = () => {

  const navigate = useNavigate();
  const [errorMessageState, seterrorMessageState] = useState('No Error');

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

            const eventsref = addDoc(collection(db, "Usernames"), {
              Username: username,
              UserId: user.uid
            });
            alertbox('User created! Welcome', username);
            setTimeout(() => {
              // This function will pause for 20 seconds and then continue
            }, 2000000);
            navigate("/");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alertbox(errorMessage);
        });
  };


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

        <div class ="registerdiv"> 
        <div class = "saplogodivlogin"></div>

        <div id="alertModal" class="modal">

          <div class="modal-content">
            <span onClick={closealert} class="close">&times;</span>
            <p>{errorMessageState}</p>
          </div>

        </div>
            
            <h2>Create a Account</h2> 

            <form class ="registerform" onSubmit={SignUp}>
              <h4>Make this something memorable as this is how your coworkers will identify you!</h4>
              <input required class = "usernameinput" value={formData.username} onChange={handleInputChange} type="text" id="username" name="username" placeholder="Username" />
              <input required class = "emailinput" value={formData.email} onChange={handleInputChange} type="text" id="email" name="email" placeholder="E-mail" />
              <input required class = "passwordinput" value={formData.password} onChange={handleInputChange} type="password" id="password" name="password" placeholder="Password" />

              <input type="submit" id="signUp" name="signUp" value="Let's Go!" />              
            </form>

            <h3>Already have an account? <a class = "registerlink" href = "/login">Login here!</a></h3>

        </div>
    </div>
  );
}

export default Register;


