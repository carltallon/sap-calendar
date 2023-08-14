
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
    const [errorMessageState, seterrorMessageState] = useState('No Error');
    const [GoodMessageState, setGoodMessageState] = useState('No Error');
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
      console.log(typeof(eventIDInt));
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

    const goodalertbox = (message) => {
      var modal = document.getElementById("goodModal");
      modal.style.display = "block";
      setGoodMessageState(message);
    }
  
    const alertbox = (errorMessage) => {
      var modal = document.getElementById("alertModal");
      modal.style.display = "block";
      seterrorMessageState(errorMessage);
    }
  
    const closealert = () => {
      var modal = document.getElementById("alertModal");
      modal.style.display = "none";
    }
  
    const closealertcontinue = () => {
      var modal = document.getElementById("alertModal");
      modal.style.display = "none";
      navigate("/");
    }

    
    
    return (
        <div>
            <NavbarNoSearch />
            <div class = "eventdetailsdiv">
              <div id="goodModal" class="modal">
                <div class="modal-contentgood">
                  <p>User created! Welcome {GoodMessageState}! </p>
                  <button class = "continuebutton" onClick={closealertcontinue}><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                </div>
              </div>
              <div id="alertModal" class="modal">
                <div class="modal-content">
                  <span onClick={closealert} class="close">&times;</span>
                  <p> Oops! Try again. {errorMessageState}</p>
                </div>
              </div>

                <div>
                {event ? (
                  <div class = "eventdetailsgrid">  
                      <div class = "eventdetailsinfo">Event Name:  <p>{ eventname }</p> </div>
                      <div class = "eventdetailsinfo">Start date: <p>{ eventstart }</p></div>
                      <div class = "eventdetailsinfo">Event type: <p>{eventtype}</p></div>
                      <div class = "eventdetailsinfo">End date: <p>{ eventend }</p> </div>
                      <div class = "eventdetailsinfo">Event Location: <p>{eventlocation}</p></div>
                      <div class = "eventdetailsinfo">Event Comment: <p>{eventcomment}</p></div>
                  </div>) : (<div>Loading.. </div>)}

                  <div class = "eventdetailsfooter">
                    <button onClick={() => deleteEvent(eventIDInt)} class = "deleteeventbtn">Delete</button>
                    <button class = "saveeventbtn">Save</button>
                  </div>
              </div> 
            </div>
        </div>
    );
};

