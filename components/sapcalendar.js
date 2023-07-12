import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import './calendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Buttons from "../components/buttons.js";
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
      title: "Big Meeting",
      allDay: true,
      start: new Date(2023, 7, 0),
      end: new Date(2023, 7, 0),
  },
  {
      title: "Vacation",
      start: new Date(2023, 7, 7),
      end: new Date(2023, 7, 10),
  },
  {
      title: "Conference",
      start: new Date(2023, 7, 6),
      end: new Date(2023, 7, 10),
  },
];


function Sapcalendar() {

  const [allEvents, setAllEvents] = useState(events);

  return (

    

    <div>

      <div class="calendarholdermain">

        <div class = "sidedivmain">
          
          <Location />
          
          
          <div class="upcomingeventsdiv">

            <h2>Your upcoming events</h2>
            <button class="upcomingeventsbutton"> <a> Upcoming Event 1</a> </button>
            <button class="upcomingeventsbutton"> <a> Upcoming Event 2</a> </button>
            <button class="upcomingeventsbutton"> <a> Upcoming Event 3</a> </button>
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
