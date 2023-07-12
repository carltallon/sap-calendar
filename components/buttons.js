import './buttons.css';

import { Link } from "react-router-dom";

export default function buttons() {
  return (
    <div>
    <div class ="mainbuttondiv">
        
      <div class="neweventbuttondiv">
        <Link to="/create">
          <button class ="neweventbutton">New Event</button>
        </Link>
      </div>

    </div>
    
    </div>

  );
}
