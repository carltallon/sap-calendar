import React from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, deleteDoc } from "firebase/firestore";

const EventDetails = () => {
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
    const events = [];

    const auth = getAuth();
    const user = auth.currentUser;

    const querySnapshot = getDocs(collection(db, "Events"));
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });  const { eventId } = useParams();

    // You can fetch event details from an API or use local data
    // For this example, we're using a static event data array

    const event = events.find(e => e.id === parseInt(eventId));

    if (!event) {
        return <div>Event not found.</div>;
    }

    function RemoveData() {
        const eventName = event.title;
    
        deleteDoc(doc(db, "Events", eventName));
    }

    return (
        <div>
            <h1>{event.title}</h1>
            <p> Start date : {event.start}</p>
            <p> End date : {event.end}</p>

            <button onClick = {RemoveData} class = "deleteeventbtn">Delete Event</button>
        </div>
    );
};

export default EventDetails;


