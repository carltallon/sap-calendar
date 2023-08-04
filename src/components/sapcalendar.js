import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import './calendar.css';
import db from '../components/firebaseconfig'; 

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { Link } from 'react-router-dom';
import Navbar from "../components/navbar.js";
import Location from "../components/location.js";
import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate  } from 'react-router-dom';

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

const events = [];
const usernames = [];
const auth = getAuth();
const user = auth.currentUser;
var username = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    fillevents(uid);
    getusername(uid);
    
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

const getusername = async (uid) => {
  const usernamequery = query(collection(db, "Usernames"), where("UserId", "==", uid));
  const usernamesnapshot = await getDocs(usernamequery);
  usernamesnapshot.forEach((doc) => {
    usernames.push(doc.data());
  });
  username = usernames[0].Username;
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

  const navigate = useNavigate();

  const handleEventClick = (event) => {
    // Add your custom logic here, e.g., display event details in a modal
    navigate(`/event/${event.eventID}`);    
  };


  const [allEvents, setAllEvents] = useState(events);

  return (

    <div>

      <Navbar />
      
      <h3 class = "usergreeting"> Hello, {username}!</h3>

      <div class="calendarholdermain">
        
        <div class = "sidedivmain">
          
          <Location />
          
          
          <div class="upcomingeventsdiv" id = "upcomingeventsdiv">

            <h2>Your upcoming events</h2>

          
            {events.slice(0, 3).map(event => <button class="upcomingeventsbutton"> 

            <Link to={`/event/${event.eventID}`}>{event.title}</Link>          

            </button>)}


          </div>
        </div>


        <div id="calendardiv">

          <Calendar 
            localizer={localizer} 
            onSelectEvent={handleEventClick} 
            events={allEvents} 
            startAccessor="start" 
            eventPropGetter={(event) => {
              const backgroundColor = event.eventtype ? "#687688" : "#519D9F";
              return { style: { backgroundColor } }
            }}
            endAccessor="end" style={{ height: 500, margin: "1vh" }} 
          />

          <div class = "h4holder">
          <h4 class = "personalH4">personal</h4> <h4 class = "workH4">work</h4>
          </div>
        </div>

      </div>
    
    </div>
  );
}

export default Sapcalendar;
