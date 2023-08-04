import './account.css';
import Navbar from '../components/navbar.js';
import Loginenforcer from "../components/loginenforcer.js";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import db from '../components/firebaseconfig'; 


export default function account() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (

    <div>
      { user ? 
    
        <div>
          <Navbar />

            <div class ="mainaccountdiv">
                

              <h3>View your Account Details</h3>

              <div class ="accountinfoholder">

                <div class = "accountitem">Email</div>
                <div type = "text" id = "emailholder" class = "accountinfoitem">{ user.email }</div>
                <div class = "accountitem">Unique ID</div>
                <div class = "accountinfoitem">{ user.uid } </div>

              </div>

              <button class = "savebtn" >Save</button>
              <button class = "signoutbtn" onClick={() => auth.signOut()}>Sign out</button>    
            </div>
          </div>


        : <Loginenforcer />}

    </div>

  );
}
