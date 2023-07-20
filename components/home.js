import './home.css';

import Navbar from "../components/navbar.js";
import SAPCalendar from "../components/sapcalendar.js";

export default function Home() {

  

  return (
    <div>
      
      <Navbar />

      <SAPCalendar />
    </div>
    
  );
}

//{ user ? <SAPCalendar /> : <Login /> }