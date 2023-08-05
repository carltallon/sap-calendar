import './location.css';

import { getAuth  } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

import { doc, deleteDoc } from "firebase/firestore";
import { query, where, getDocs } from 'firebase/firestore';
import db from '../components/firebaseconfig'; 

function location() {
  return (

    <div class="locationdiv">
        <h2>Your Location today?</h2>
        <h4>Let your coworkers know where you are working from today!</h4>

        <button id = "locationbtnathome" onClick = {workingfromhome} class = 'locationbtnathome'></button>

        <button id = "locationbtnatoffice" onClick = {workingfromoffice} class = 'locationbtnatoffice'></button>
    </div>
    

  );
}

export default location;


function workingfromhome() {

  const auth = getAuth();
  
  const locationbtnatoffice = document.getElementById('locationbtnatoffice');
  const locationbtnathome = document.getElementById('locationbtnathome');
  const { uid } = auth.currentUser;

  locationbtnatoffice.style.border = 'none';
  locationbtnathome.style.border = '2px solid black';

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  deletelocations(uid, "Office");

  const locationRef = addDoc(collection(db, "Locations"), {
    location: "Home",
    UserID: uid,
    Date: formattedDate
  });
}


function workingfromoffice() {

    const auth = getAuth();
    const locationbtnatoffice = document.getElementById('locationbtnatoffice');
    const locationbtnathome = document.getElementById('locationbtnathome');
    const { uid } = auth.currentUser;

    locationbtnathome.style.border = 'none';
    locationbtnatoffice.style.border = '2px solid black';
    
    deletelocations(uid, "Home");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    const locationRef = addDoc(collection(db, "Locations"), {
      location: "Office",
      UserID: uid,
      Date: formattedDate
    });

}

const deletelocations = async (uid,location) => {
  const eventsquery = query(collection(db, "Locations"), where("UserID", "==", uid), where("location", "==", location));
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
