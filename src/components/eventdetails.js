
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

    //get event function 
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

    //call get event function and WAIT until returns
    useEffect(() => {
        getEventByEventID(eventIDInt)
          .then((eventsArray) => {
            setEvent(eventsArray);
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
          });
    }, []);

    //define event variables
    var eventname = "";
    var eventstart = "";
    var eventend = "";
    var eventcomment = "";
    var eventlocation = "";
    var eventtype = "";

    //fill  variables when event is found 
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

    const deleteevent = async (eventIDInt) => {
      const eventsquery = query(collection(db, "Events"), where("eventID", "==", eventIDInt));
      const querySnapshot = await getDocs(eventsquery);
      console.log(querySnapshot.data);
      // Check if there are matching documents
      if (!querySnapshot.empty) {
        // There is at least one matching document
        // Assuming you want to delete all matching documents, you can loop through the documents
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        console.log('Documents deleted successfully.');
      } else {
        // No matching documents found
        console.log('No matching documents found.');
      }
    };
    
    return (
        <div>
            <Navbar />
            <div class = "eventdetailsdiv">
              
                {event ? (
                <div class = "eventdetailsgrid">  
                    <h1>Event Details</h1>
                    <div class = "eventdetailsinfo">Event Name:  <p>{ eventname }</p> </div>
                    <div class = "eventdetailsinfo">Start date: <p>{ eventstart }</p></div>
                    <div class = "eventdetailsinfo">End date: <p>{ eventend }</p> </div>
                    <div class = "eventdetailsinfo">Event type: <p>{eventtype}</p></div>
                    <div class = "eventdetailsinfo">Event Location: <p>{eventlocation}</p></div>
                    <div class = "eventdetailsinfo">Event Comment: <p>{eventcomment}</p></div>

                    <div class = "eventdetailsfooter">
                        <button onClick = {deleteevent} class = "deleteeventbtn">Delete Event</button>
                        <button class = "saveeventbtn">Save Event</button>
                    </div>
                </div>
                ) : (<div>Loading.. </div>)}

                    
            </div>
        </div>
    );
};

