
import "./eventdetails.css";
import { useParams } from 'react-router-dom';
import { getAuth  } from "firebase/auth";
import { doc, deleteDoc, updateDoc  } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import NavbarNoSearch from "../components/navbarnosearch.js";
import React, { useEffect, useState } from "react";

import { useNavigate  } from 'react-router-dom';

import db from '../components/firebaseconfig'; 

const auth = getAuth();


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

    const deleteEvent = (eventIDInt) => {
      const eventsQuery = query(collection(db, "Events"), where("eventID", "==", eventIDInt));
    
      getDocs(eventsQuery)
        .then((querySnapshot) => {
          console.log(querySnapshot.docs);
          // Check if there are matching documents
          if (!querySnapshot.empty) {
            // There is at least one matching document
            // Assuming you want to delete all matching documents, you can loop through the documents
            querySnapshot.docs.forEach((doc) => {
              deleteDoc(doc.ref);
            });
            console.log('Documents deleted successfully.');
          } else {
            // No matching documents found
            console.log('No matching documents found.');
          }
        })
        .catch((error) => {
          console.error("Error deleting documents: ", error);
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

    
    
    return (
        <div>
            <NavbarNoSearch />
            <div class = "eventdetailsdiv">
                {event ? (
                <div>
                  <div class = "eventdetailsgrid">  
                      <div class = "eventdetailsinfo">Event Name:  <p>{ eventname }</p> </div>
                      <div class = "eventdetailsinfo">Start date: <p>{ eventstart }</p></div>
                      <div class = "eventdetailsinfo">Event type: <p>{eventtype}</p></div>
                      <div class = "eventdetailsinfo">End date: <p>{ eventend }</p> </div>
                      <div class = "eventdetailsinfo">Event Location: <p>{eventlocation}</p></div>
                      <div class = "eventdetailsinfo">Event Comment: <p>{eventcomment}</p></div>
                  </div>

                  <div class = "eventdetailsfooter">
                    <button onClick = {deleteEvent} class = "deleteeventbtn">Delete</button>
                    <button class = "saveeventbtn">Save</button>
                  </div>
              </div>
                ) : (<div>Loading.. </div>)}

                    
            </div>
        </div>
    );
};

