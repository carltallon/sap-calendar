import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import './calendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Buttons from "../components/buttons.js";
import Navbar from "../components/navbar.js";
import Location from "../components/location.js";

import React, { useState } from "react";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
      title: "Weekly Sync",
      allDay: true,
      start: new Date(2023, 7, 0),
      end: new Date(2023, 7, 0),
  },
  {
      title: "CoE Intern XP",
      start: new Date(2023, 7, 7),
      end: new Date(2023, 7, 10),
  },
  {
      title: "D-Com",
      start: new Date(2023, 7, 6),
      end: new Date(2023, 7, 10),
  },
];

const eventNames = events.map(({ title }) => title)


function Sapcalendar() {

  const [allEvents, setAllEvents] = useState(events);

  return (

    <div>
      <Navbar />

      <div class="calendarholdermain">

        <div class = "sidedivmain">
          
          <Location />
          
          
          <div class="upcomingeventsdiv" id = "upcomingeventsdiv">

            <h2>Your upcoming events</h2>

            {eventNames.map(title => <button class="upcomingeventsbutton"> <a> {title} </a> </button>)}


          </div>
        </div>


        <div id="calendardiv">

          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
          
          <Buttons />
        </div>

      </div>
    
    </div>
  );
}

export default Sapcalendar;
