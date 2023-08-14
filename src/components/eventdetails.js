
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
const convertFirestoreTimestampToDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
            goodalertbox(event.title);
          }
        })
        .catch((error) => {
          alertbox(error);
        });
    };


    const updateEvent = ( event,eventIDInt ) => {
      const eventsQuery = query(collection(db, "Events"), where("eventID", "==", eventIDInt));
      
      getDocs(eventsQuery)
        .then((querySnapshot) => {
          console.log(querySnapshot.docs);
          // Check if there are matching documents
          if (!querySnapshot.empty) {
            // There is at least one matching document
            // Assuming you want to update all matching documents, you can loop through the documents
            querySnapshot.docs.forEach((doc) => {
              const eventRef = doc.ref;
              updateDoc(eventRef, event)
                .then(() => {
                  goodalertbox(event.title);
                })
                .catch((error) => {
                  alertbox("Error updating event: " + error);
                });
            });
          }
        })
        .catch((error) => {
          alertbox("Error fetching event: " + error);
        });
    };

    //call get event function and WAIT until returns
    useEffect(() => {
        getEventByEventID(eventIDInt)
          .then((eventsArray) => {
            setEvent(eventsArray[0]);
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
          });
    }, []);

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

    const handlePropertyChange = (propertyName, newValue) => {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [propertyName]: newValue
      }));
    };
    
    return (
        <div>
            <NavbarNoSearch />
            <div class = "eventdetailsdiv">
              <div id="goodModal" class="modal">
                <div class="modal-contentgood">
                  <p>Event "{GoodMessageState}" updated. </p>
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

                      <div class = "eventdetailsinfo">Event Name:</div>
                      <div class = "eventdetailsinfo">Start date:</div>
                      <input type = "text" defaultValue = {event.title} onChange={(e) => handlePropertyChange('title', e.target.value)}></input>
                      <input type = "date" defaultValue = {convertFirestoreTimestampToDate(event.start)} onChange={(e) => handlePropertyChange('startdate', e.target.value)}></input>
                      <div class = "eventdetailsinfo">Event type: </div>
                      <div class = "eventdetailsinfo">End date: </div>
                      <select class="eventdetailsdropdown" defaultValue = {event.eventtype} onChange={(e) => handlePropertyChange('eventtype', e.target.value)}>
                            <option value="work">Work Event</option>
                            <option value="personal">Personal Event</option>
                      </select>
                      <input type = "date" defaultValue = {convertFirestoreTimestampToDate(event.end)} onChange={(e) => handlePropertyChange('startdate', e.target.value)}></input>
                      
                      <div class = "eventdetailsinfo">Event Location: </div>
                      <div class = "eventdetailsinfo">Event Comment: </div>  
                      <input type = "text" defaultValue = {event.location} onChange={(e) => handlePropertyChange('location', e.target.value)}></input>
                      <input type = "text" defaultValue = {event.comment} onChange={(e) => handlePropertyChange('comment', e.target.value)}></input>
                    
                  </div>) : (<div>Loading.. </div>)}

                  <div class = "eventdetailsfooter">
                    <button onClick={() => deleteEvent(eventIDInt)} class = "deleteeventbtn">Delete</button>
                    <button onClick={() => updateEvent(event, eventIDInt)}class = "saveeventbtn">Save</button>
                  </div>
              </div> 
            </div>
        </div>
    );
};

