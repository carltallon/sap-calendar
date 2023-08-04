import './seat.css';

import Navbar from "../components/navbar.js";
import Loginenforcer from "../components/loginenforcer.js"
import db from '../components/firebaseconfig'; 
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const locations = [];
const auth = getAuth();

const querySnapshot = await getDocs(collection(db, "Locations"));
querySnapshot.forEach((doc) => {
  locations.push(doc.data());
});

const usersathome = [];
const usersinoffice = [];
const usernameshome = [];
const usernamesoffice = [];

for (let i = 0; i < locations.length; i++) {
  if (locations[i].location === 'Home'){
    usersathome.push(locations[i].UserID);
  }
  if (locations[i].location === 'Office'){
    usersinoffice.push(locations[i].UserID);
  }   
}

const getusernameoffice = async (uid) => {
  const usernamequery = query(collection(db, "Usernames"), where("UserId", "==", uid));
  const usernamesnapshot = await getDocs(usernamequery);
  usernamesnapshot.forEach((doc) => {
    usernamesoffice.push(doc.data());
  });
}

const getusernamehome = async (uid) => {
  const usernamequery = query(collection(db, "Usernames"), where("UserId", "==", uid));
  const usernamesnapshot = await getDocs(usernamequery);
  usernamesnapshot.forEach((doc) => {
    usernameshome.push(doc.data());
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
        <Navbar />
        <div class = "mainseatdiv">
          <div class ="seatdiv">

              <h2>Seating</h2>

              <h2>Colleagues in Office</h2>
              {usernamesoffice.map(UserID => <button class ="users"> <a>{UserID}</a></button>)}

              <h2>Colleagues at home </h2>
              {usersathome.map(UserID => <button class = "users"> <a>{UserID}</a></button>)}

          </div>

          <div class = "seatingimgdiv"></div>
        </div>
      </div>

      
      :<Loginenforcer />}

    </div>
    
  );
}
