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
            alert('User created!');
            navigate("/");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    
  };
  return (
    <div>
        <div class ="registerdiv"> 
            <h2>Register</h2> 

            <form class ="registerform" onSubmit={SignUp}>
              <h4>Make this something memorable as this is how your coworkers will identify you!</h4>
              <input required class = "usernameinput" value={formData.username} onChange={handleInputChange} type="text" id="username" name="username" placeholder="Username" />
              <input required class = "emailinput" value={formData.email} onChange={handleInputChange} type="text" id="email" name="email" placeholder="E-mail" />
              <input required class = "passwordinput" value={formData.password} onChange={handleInputChange} type="password" id="password" name="password" placeholder="Password" />

              <input type="submit" id="signUp" name="signUp" value="Let's Go!" />              
            </form>

            <h3>Already have an account? <a class = "registerlink" href = "/login">Login</a></h3>

        </div>
    </div>
  );
}

export default Register;


