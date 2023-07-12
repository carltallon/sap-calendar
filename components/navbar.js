
import './navbar.css';

import { NavLink } from "react-router-dom";

export default function navbar() {

  return (

    <div id="navigation">
        <ul>
            
            <a href='https://www.sap.com'>
                <li id="saplogonavbar"></li>
            </a>

            <label class="switch">
                <input id = "colormode" type="checkbox" onClick={darkmode}/>
                <span class="slider round"></span>
            </label>

        </ul>

        <ul>

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

function darkmode() {

    var color = "#41a3ffe0";
    var black = "#00000000";
    var background = document.getElementById("background");
    var toggle = document.getElementById("colormode");

    toggle.onchange = function() {
        if ( toggle.checked === false ) {
            
            background.style.background = black;
        }

        if ( toggle.checked === true ) {
            
            background.style.background = color;
        }
    };
}