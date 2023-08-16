import './home.css';

import Login from "../components/login.js";
import SAPCalendar from "../components/sapcalendar.js";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';



// Initialize Firebase

const auth = getAuth();

export default function Home() {

  const[user] = useAuthState(auth);

  return (

    <div>
      { user ? <SAPCalendar />:<Login />}
    </div>
    
  );
}

