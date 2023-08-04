
import "./eventdetails.css";
import { useParams } from 'react-router-dom';
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, deleteDoc, updateDoc  } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/navbar.js";
import React, { useEffect, useState } from "react";

import { useNavigate  } from 'react-router-dom';

import db from '../components/firebaseconfig'; 

const auth = getAuth();
const user = auth.currentUser;


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
    const eventIDInt = parseInt(eventID, 10);
    const eventfromquery = [];

    
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    const getEventByEventID = (eventIDInt) => {
        const eventsquery = query(collection(db, "Events"), where("eventID", "==", eventIDInt));
      
        return getDocs(eventsquery)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const eventData = doc.data();
              eventfromquery.push(eventData);
            });
            return eventfromquery;
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
            return [];
          });
    };


    useEffect(() => {
        getEventByEventID(eventIDInt)
          .then((eventsArray) => {
            setEvent(eventsArray);
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
          });
    }, []);

    var eventname = "";
    var eventstart = "";
    var eventend = "";
    var eventcomment = "";
    var eventlocation = "";
    var eventtype = "";

    if (event !== null){
        eventname = event[0].title;
        const eventstartdate = convertFirestoreTimestampToDate(event[0].start);
        eventstart = eventstartdate.toDateString();

        const eventenddate = convertFirestoreTimestampToDate(event[0].end);
        eventend = eventenddate.toDateString();

        eventlocation = event[0].location;
        eventcomment = event[0].comment;
        eventtype = event[0].eventtype;

    }

    const RemoveData = async() => {
        await deleteDoc(doc(db, "Events", eventID));
        console.log(eventID)
        alert("Event Deleted");
        navigate("/")
    }

    const [eventnamestate, setEventnamestate] = useState(eventname); 
    console.log("eventstate:" , eventnamestate);

    const handleInputChange = (event) => {
        setEventnamestate(event.target.value); // Update the username state with the new input value
    };


    const Updatedata = async() => {

        const title = document.getElementById('titleupdate').value;
        const location = document.getElementById('locationupdate').value;
        const comment = document.getElementById('commentupdate').value;


        const eventref = doc(db, "Events", eventID);

        // Set the "capital" field of the city 'DC'
        await updateDoc(eventref, {
            title: title,
            eventID: eventID,
            location: location,
            comment: comment
        });
        console.log(eventID)
        alert("Event Updated");
        navigate("/")
    }

    return (
        <div>
            <Navbar />
            <div class = "eventdetailsdiv">
              <h1>Event Details</h1>
                {event ? (
                <div>
                    
                    <div class = "eventdetailsinfo">Event Name:  <p>{ eventname }</p> </div>
                    <div class = "eventdetailsinfo">Start date: <p>{ eventstart }</p></div>
                    <div class = "eventdetailsinfo">End date: <p>{ eventend }</p> </div>
                    <div class = "eventdetailsinfo">Event type: <p>{eventtype}</p></div>
                    <div class = "eventdetailsinfo">Event Location: <p>{eventlocation}</p></div>
                    <div class = "eventdetailsinfo">Event Comment: <p>{eventcomment}</p></div>

                    <div class = "eventdetailsfooter">
                        <button onClick = {RemoveData} class = "deleteeventbtn">Delete Event</button>
                        <button onClick = {Updatedata} class = "saveeventbtn">Save Event</button>
                    </div>
                </div>) : (<div>Loading.. </div>)}
                    
            </div>
        </div>
    );
};

