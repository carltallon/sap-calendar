import React from 'react';
import "./eventdetails.css";
import { useParams } from 'react-router-dom';
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, deleteDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/navbar.js";

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

const auth = getAuth();
const user = auth.currentUser;
  

export const EventDetails = () => {
    
    const { eventtitle } = useParams();
    
    
    const events = [];

    const eventQuery = query(collection(db, "Events"), where("title","==", eventtitle));
    

    function RemoveData() {
    
        //deleteDoc(doc(db, "Events", eventtitle));
    }

    console.log(events);
    return (
        <div>
            <Navbar />
            <div class = "eventdetailsdiv">
                <h1>Event Details</h1>
                    {events ? (
                    <div>
                        <p> Start date : {events[0].start}</p>
                        <p> End date : {events[0].end}</p>
                        <button onClick = {RemoveData} class = "deleteeventbtn">Delete Event</button>
                    </div>
                    ) : (
                    <p>Event not found</p>
                    )}
            </div>
        </div>
    );
};



