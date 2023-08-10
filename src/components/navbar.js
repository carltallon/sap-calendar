
import './navbar.css';

import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import SearchBar from "../components/searchbar.js";
import { Link } from 'react-router-dom';

export default function Navbar( {events} ) {

    const [allEvents, setAllEvents] = useState(events);
    const [filteredEvents, setFilteredEvents] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    
    const handleSearch = (query) => {
        clearTimeout(searchTimeout);
    
        const timeoutId = setTimeout(() => {
          const filtered = allEvents.filter((event) =>
            event.title.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredEvents(filtered);
        }, 20); // Adjust the debounce interval as needed (e.g., 300ms)
    
        setSearchTimeout(timeoutId);
      };

    const FilteredEventsList = ({ filteredEvents }) => {
        return (
          <div class = "searchresult">
            {filteredEvents.map((event, index) => (
                <div class = "individualsearchresult" key={index}><Link to={`/event/${event.eventID}`}>{event.title}</Link>  </div>
            ))}
          </div>
        );
    };

  return (

    <div id="navigation">
        <ul>
            
            <a href='https://www.sap.com'>
                <li title="SAP Website" id="saplogonavbar"></li>
            </a>

            <label class="switch">
                <input id = "colormode" type="checkbox" onClick={darkmode}/>
                <span class="slider round"></span>
            </label>

            
        </ul>

        <div>

            <SearchBar allEvents={allEvents} onSearch={handleSearch} />

            {filteredEvents && filteredEvents.length > 0 && (
                <FilteredEventsList filteredEvents={filteredEvents}/> 
            )}

        </div>

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

function darkmode() {

    var whitecolor = "#FFFFFF";
    var blackcolor = "#00000000";
    var background = document.getElementById("background");
    var toggle = document.getElementById("colormode");
    var footer = document.getElementById("footer");
    var upcomingeventsdiv = document.getElementById("upcomingeventsdiv");
    var calendardiv = document.getElementById("calendardiv");
    var navbar = document.getElementById("navigation");

    toggle.onchange = function() {
        if ( toggle.checked === false ) {
            background.style.background = whitecolor;
            background.style.color = 'black';
            footer.style.color = 'black';
            footer.style.borderTop = '1px solid #4c4c4cbe';
            upcomingeventsdiv.style.borderTop = '2px solid black';
            calendardiv.style.color = 'black';
            navbar.style.borderBottom = '1px solid #515151';
            
        }

        if ( toggle.checked === true ) {
            
            background.style.background = blackcolor;
            background.style.color = whitecolor;
            footer.style.color = 'white';
            footer.style.borderTop = '1px solid white';
            upcomingeventsdiv.style.borderTop = '2px solid white';
            calendardiv.style.color = 'white';
            navbar.style.borderBottom = '1px solid white';
        }
    };
}
