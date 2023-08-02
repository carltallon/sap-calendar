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

const getevent = async (eventID) => {
    
    const eventsquery = query(collection(db, "Events"), where("eventID", "==", eventID));
    const eventSnapshot = await getDocs(eventsquery);
    eventSnapshot.forEach((doc) => {
        const eventData = doc.data();
        const event = {
            id: eventSnapshot.id,
            ...eventData,
          };
        console.log(event);
    });


    //event.start = convertFirestoreTimestampToDate(event.start);
    //event.end = convertFirestoreTimestampToDate(event.end);
    
    //return event;
}

// Function to convert timestamp to a JavaScript Date objects
const convertFirestoreTimestampToDate = (firestoreTimestamp) => {
    if (!firestoreTimestamp || !firestoreTimestamp.seconds) {
      return null; // Return null if timestamp is invalid or not provided
    }
    const { seconds, nanoseconds } = firestoreTimestamp;
    return new Date(seconds * 1000 + nanoseconds / 1000000); // Combine seconds and nanoseconds
};

export const EventDetails = () => {
    
    const { eventID } = useParams();
    getevent(eventID);

    
    function RemoveData() {
    
        //deleteDoc(doc(db, "Events", eventtitle));
    }

    return (
        <div>
            <Navbar />
            <div class = "eventdetailsdiv">
                <h1>Event Details</h1>
                
                    
            </div>
        </div>
    );
};



//event ? (
                //    <div>
                //        <p> Title : {event.title}</p>
                //        <p> Start date : {event.start}</p>
                //        <p> End date : {event.end}</p>
                //        <button onClick = {RemoveData} class = "deleteeventbtn">Delete Event</button>
                //    </div>
                //    ) : (
                //    <p>Event not found</p>
                //)}