import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import './calendar.css';

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAuth, onAuthStateChanged  } from "firebase/auth";

import { Link } from 'react-router-dom';
import Buttons from "../components/buttons.js";
import Navbar from "../components/navbar.js";
import Location from "../components/location.js";
import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


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

const events = [];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    fillevents(uid);
  } 
});

const fillevents = async (uid) => {
  const eventsquery = query(collection(db, "Events"), where("UserID", "==", uid));
  const querySnapshot = await getDocs(eventsquery);
  querySnapshot.forEach((doc) => {
    events.push(doc.data());
  });

  for (let i = 0; i < events.length; i++) {
    events[i].start = convertFirestoreTimestampToDate(events[i].start);
    events[i].end = convertFirestoreTimestampToDate(events[i].end);
  }
}

// Function to convert timestamp to a JavaScript Date object
const convertFirestoreTimestampToDate = (firestoreTimestamp) => {
  if (!firestoreTimestamp || !firestoreTimestamp.seconds) {
    return null; // Return null if timestamp is invalid or not provided
  }
  const { seconds, nanoseconds } = firestoreTimestamp;
  return new Date(seconds * 1000 + nanoseconds / 1000000); // Combine seconds and nanoseconds
};





const Sapcalendar = () => {

  
  const [allEvents, setAllEvents] = useState(events);
 
  return (

    <div>

      <Navbar />

      <div class="calendarholdermain">

        <div class = "sidedivmain">
          
          <Location />
          
          
          <div class="upcomingeventsdiv" id = "upcomingeventsdiv">

            <h2>Your upcoming events</h2>

            {events.slice(0, 3).map(event => <button class="upcomingeventsbutton"> 

            <Link to={`/event/$(event.title)}`}>{event.title}</Link>            

            </button>)}


          </div>
        </div>


        <div id="calendardiv">

          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
          
          <Buttons />
        </div>

      </div>
    
    </div>
  );
}

export default Sapcalendar;
