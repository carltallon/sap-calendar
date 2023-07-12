import './home.css';

import Buttons from "../components/buttons.js";
import Navbar from "../components/navbar.js";
import SAPCalendar from "../components/sapcalendar.js";
import Login from "../components/login.js";

export default function Home() {

  

  return (
    <div>
    
    <Navbar />

    <SAPCalendar />

    </div>
    
  );
}

//{ user ? <SAPCalendar /> : <Login /> }