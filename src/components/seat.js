import './seat.css';

import NavbarNoSearch from "../components/navbarnosearch.js";
import Loginenforcer from "../components/loginenforcer.js"
import db from '../components/firebaseconfig'; 
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs } from "firebase/firestore";

const locations = [];
const auth = getAuth();

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();

const querySnapshot = await getDocs(collection(db, "Locations"), where("Date", "==", formattedDate));
querySnapshot.forEach((doc) => {
  locations.push(doc.data());
});

const usersathome = [];
const usersinoffice = [];
const usernameshome = [];
const usernamesoffice = [];

for (let i = 0; i < locations.length; i++) {
  if (locations[i].location === "Home"){
    usersathome.push(locations[i].UserID);
  }
  else if (locations[i].location === "Office"){
    usersinoffice.push(locations[i].UserID);
  }   
}


const getusernameoffice = async (uid) => {
  const usernamequery = query(collection(db, "Usernames"), where("UserId", "==", uid));
  const usernamesnapshot = await getDocs(usernamequery);
  usernamesnapshot.forEach((doc) => {
    usernamesoffice.push(doc.data().Username);
  });
}

const getusernamehome = async (uid) => {
  const usernamequery = query(collection(db, "Usernames"), where("UserId", "==", uid));
  const usernamesnapshot = await getDocs(usernamequery);
  usernamesnapshot.forEach((doc) => {
    usernameshome.push(doc.data().Username);
  });
}

for (let i = 0; i < usersinoffice.length; i++) {
  var uid = usersinoffice[i];
  getusernameoffice(uid);
}

for (let i = 0; i < usersathome.length; i++) {
  var uid = usersathome[i];
  getusernamehome(uid);
}


export default function Seat() {

  const[user] = useAuthState(auth);

  

  return (
    <div>

      { user ? 
      <div>
        <NavbarNoSearch />
        <div class = "mainseatdiv">
          <div class ="seatdiv">

              <h2>Seating</h2>
              <h2>Colleagues in Office</h2>
              {usernamesoffice.length > 0 ? ( 
              <div class = "userholder"> 
                {usernamesoffice.map(Username => <button class ="users"> {Username}</button>)}
              </div>)
               : (<div><h4>Nobody in Office today!</h4></div>) 
              }
              <h2>Colleagues at home </h2>
              {usernameshome.length > 0 ? (
              <div class = "userholder">
                  {usernameshome.map(Username => <button class = "users">{Username}</button>)}
              </div>)
               : (
              <div>
                <h4>Nobody at Home today!</h4>
              </div>) 
              }
              

          </div>

          <div class = "seatingimgdiv"></div>
        </div>
      </div>

      
      : <Loginenforcer />}

    </div>
    
  );
}
