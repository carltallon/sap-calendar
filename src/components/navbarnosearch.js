
import './navbar.css';

import { NavLink } from "react-router-dom";

export default function NavbarNoSearch() {


  return (

    <div id="navigation">
        <ul>
            
            <a href='https://www.sap.com'>
                <li title="SAP Website" id="saplogonavbar"></li>
            </a>
            
        </ul>

        <ul>

            <NavLink className="eventnavbar" to="/create">
                <i title="New Event" id = "neweventicon" class="fa fa-plus" aria-hidden="true"></i>
            </NavLink>

            <NavLink className="accountnavbar" to="/">
                <i title="Calendar" id = "calendaricon" class="fa fa-calendar" aria-hidden="true"></i>
            </NavLink>

            <NavLink className="accountnavbar" to="/seat">
                <i title="Seating" id = "seaticon" class="fa fa-building" aria-hidden="true"></i>
            </NavLink>

            <NavLink className="accountnavbar" to="/account">
                <i title="Account" id = "accounticon" class="fa fa-user"></i>
            </NavLink>
        </ul>
    </div>

  );
}


