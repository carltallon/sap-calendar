import './account.css';
import NavbarNoSearch from '../components/navbarnosearch.js';
import Loginenforcer from "../components/loginenforcer.js";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { useNavigate  } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../components/firebaseconfig'; 


const usernames = [];
var username = "";
const auth = getAuth();
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    getusername(uid);
  } 
});


const getusername = async (uid) => {
  const usernamequery = query(collection(db, "Usernames"), where("UserId", "==", uid));
  const usernamesnapshot = await getDocs(usernamequery);
  usernamesnapshot.forEach((doc) => {
    usernames.push(doc.data());
  });
  username = usernames[0].Username;
}

export default function Account() {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  getusername(uid);

  const navigate = useNavigate();

  const signout = () => {
    auth.signOut();
    navigate("/");
  }

  return (

    <div>
      { user ? 
        <div>
          <NavbarNoSearch />

            <div class ="mainaccountdiv">
                

              <h3>Account Details</h3>

              { username ? (
              <div class ="accountinfoholder">
              
                <div class = "accountitem">Email</div>
                <div type = "text" id = "emailholder" class = "accountinfoitem">{ user.email }</div>
                <div class = "accountitem">Unique ID</div>
                <div class = "accountinfoitem">{ user.uid } </div>
                <div class = "accountitem">Username</div>
                <div class = "accountinfoitem">{ username } </div>

              </div>) : (<div>Loading...</div>)}

              <button class = "signoutbtn" onClick={signout}>Sign out</button>    
            </div>
          </div>


        : <Loginenforcer />}

    </div>

  );
}
