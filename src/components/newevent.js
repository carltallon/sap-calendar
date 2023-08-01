import './newevent.css';

import Navbar from "../components/navbar.js";
import Loginenforcer from "../components/loginenforcer.js"

import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { useNavigate  } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



export default function Newevent() {

    const firebaseConfig = {
        // Your Firebase configuration here
        apiKey: "AIzaSyCf8LYQfeurGdAvB5Uu_eeQIVoWyl6Z3IY",
        authDomain: "test-30bf7.firebaseapp.com",
        databaseURL: "https://test-30bf7-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "test-30bf7",
        storageBucket: "test-30bf7.appspot.com",
        messagingSenderId: "381008086519",
        appId: "1:381008086519:web:f5fce4c537e56933ca1af2",
        measurementId: "G-PMRE4PWB4B"
    };
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const navigate = useNavigate();
    
    const auth = getAuth();

    const user = auth.currentUser;

    const createventDB = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const startdateInput = document.getElementById('startdate').value;
        const starttimeInput = document.getElementById('starttime').value;

        const enddateInput = document.getElementById('enddate').value;
        const endtimeInput = document.getElementById('endtime').value;

        console.log(endtimeInput);
        console.log(enddateInput);

        // Combine date and time inputs into a JavaScript Date object
        const startdateTimeString = `${startdateInput}T${starttimeInput}:00`;
        const start = new Date(startdateTimeString);

        console.log(startdateTimeString);

        const enddateTimeString = `${enddateInput}T${endtimeInput}:00`;
        const end = new Date(enddateTimeString);

        const title = document.getElementById('EventTitle').value;

        const { uid } = auth.currentUser;


        const eventsref = addDoc(collection(db, "Events"), {
            title: title,
            start: start,
            end: end,
            UserID: uid
        });

        navigate("/");

    }
        

  return (
    <div>

        { user ? 
    <div>
        <Navbar />
        <div class="dashboard__wrapper">
            <div class="dashboard__body">
                <div class="start__block">
                    <form id = "eventform" onSubmit={createventDB}>
                        <div class="form_header">
                            Create A New Event
                        </div>
                        <div class="form_body">
                            <div class="form-group d-flex">
                                <label class="w-6rem">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M28.4999 13.5H16.5V1.4999C16.5 0.672087 15.828 0 14.9999 0C14.172 0 13.5 0.672087 13.5 1.4999V13.5H1.4999C0.672087 13.5 0 14.172 0 14.9999C0 15.828 0.672087 16.5 1.4999 16.5H13.5V28.4999C13.5 29.3279 14.172 30 14.9999 30C15.828 30 16.5 29.3279 16.5 28.4999V16.5H28.4999C29.3279 16.5 30 15.828 30 14.9999C30 14.172 29.3279 13.5 28.4999 13.5Z" fill="#B610B0"/>
                                    </svg>
                                </label>
                                <div class="input-group">
                                    <input required id = "EventTitle" type="text" placeholder="Add Title" class="form-control border-bottom" />
                                </div>
                            </div>
                            <div class="form-group d-flex">
                                <div class="input-group">
                                    
                                    <div class="row my-2rem">
                                        <div class="col-sm-4">
                                            <input required type="date" id="startdate" class="form-control border" />
                                        </div>
                                        <div class="col-sm-4">
                                            <select required id = "starttime" class="form-control border">
                                                <option value="08:00" selected>8:00 am</option>
                                                <option value="09:00">9:00 am</option>
                                                <option value="10:00">10:00 am</option>
                                                <option value="11:00">11:00 am</option>
                                                <option value="12:00">12:00 pm</option>
                                                <option value="13:00">01:00 pm</option>
                                                <option value="14:00">02:00 pm</option>
                                                <option value="15:00">03:00 pm</option>
                                                <option value="16:00">04:00 pm</option>
                                                <option value="17:00">05:00 pm</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <input required type="date" id="enddate" class="form-control border" />
                                        </div>
                                        <div class="col-sm-4">
                                            <select required id="endtime" class="form-control border">
                                                <option value="08:00">8:00 am</option>
                                                <option value="09:00" selected>9:00 am</option>
                                                <option value="10:00">10:00 am</option>
                                                <option value="11:00">11:00 am</option>
                                                <option value="12:00">12:00 pm</option>
                                                <option value="13:00">01:00 pm</option>
                                                <option value="14:00">02:00 pm</option>
                                                <option value="15:00">03:00 pm</option>
                                                <option value="16:00">04:00 pm</option>
                                                <option value="17:00">05:00 pm</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group d-flex">
                                <label class="w-6rem">
                                    <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.129 0C8.17863 0.00395631 5.35019 1.19049 3.26394 3.29941C1.17769 5.40834 0.00391378 8.26752 0 11.25C0 19.3265 10.3685 29.4422 10.8091 29.8687C10.8948 29.9529 11.0095 30 11.129 30C11.2485 30 11.3633 29.9529 11.449 29.8687C11.8895 29.4422 22.2581 19.3265 22.2581 11.25C22.2542 8.26752 21.0804 5.40834 18.9941 3.29941C16.9079 1.19049 14.0794 0.00395631 11.129 0ZM11.129 16.4062C10.1202 16.4062 9.134 16.1038 8.29518 15.5372C7.45635 14.9707 6.80257 14.1654 6.4165 13.2232C6.03043 12.281 5.92942 11.2443 6.12624 10.2441C6.32305 9.24384 6.80886 8.32509 7.52222 7.60397C8.23558 6.88286 9.14445 6.39177 10.1339 6.19282C11.1234 5.99386 12.149 6.09598 13.081 6.48624C14.0131 6.8765 14.8097 7.53739 15.3702 8.38533C15.9307 9.23327 16.2298 10.2302 16.2298 11.25C16.229 12.6173 15.6914 13.9283 14.735 14.8951C13.7785 15.8619 12.4816 16.4054 11.129 16.4062Z" fill="#FE3D00"/>
                                    </svg>
                                </label>
                                <div class="input-group position-relative addLocation">
                                    <input type="text" placeholder="Add a location" class="form-control border-bottom" />
                                </div>
                            </div>
                            <div class="form-group d-flex">
                                <label class="w-6rem">
                                    <svg width="27" height="31" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.11538 3.11523C2.28913 3.11523 1.49672 3.44346 0.912475 4.02771C0.328227 4.61196 0 5.40437 0 6.23062V30.1152H27V3.11523H3.11538Z" fill="#FCEC97"/>
                                        <path d="M5.19238 6.23047H17.6539V14.5382H5.19238V6.23047Z" fill="#F1C056"/>
                                        <path d="M22.8464 15.5769V2.07692C22.8464 1.52609 22.6276 0.997815 22.2381 0.608317C21.8486 0.218818 21.3203 0 20.7695 0H15.5771C16.128 0 16.6563 0.218818 17.0458 0.608317C17.4353 0.997815 17.6541 1.52609 17.6541 2.07692V15.5769L20.2502 13.5L22.8464 15.5769Z" fill="#E4544F"/>
                                        <path d="M17.6538 3.11538V2.07692C17.6538 1.52609 17.435 0.997815 17.0455 0.608317C16.656 0.218818 16.1278 0 15.5769 0C15.0261 0 14.4978 0.218818 14.1083 0.608317C13.7188 0.997815 13.5 1.52609 13.5 2.07692V3.11538H17.6538Z" fill="#F1997E"/>
                                        <path d="M0 6.23062V30.1152H3.11538V3.11523C2.28913 3.11523 1.49672 3.44346 0.912475 4.02771C0.328227 4.61196 0 5.40437 0 6.23062Z" fill="#F1C056"/>
                                        <path d="M22.8457 6.23047H24.9226V14.5382H22.8457V6.23047Z" fill="#F1C056"/>
                                        <path d="M4.67285 16.0957H16.0959V17.1342H4.67285V16.0957Z" fill="#2D75BB"/>
                                        <path d="M4.67285 18.1729H7.78824V19.2113H4.67285V18.1729Z" fill="#2D75BB"/>
                                        <path d="M8.82715 18.1729H9.86561V19.2113H8.82715V18.1729Z" fill="#2D75BB"/>
                                        <path d="M10.9043 18.1729H12.462V19.2113H10.9043V18.1729Z" fill="#2D75BB"/>
                                        <path d="M13.5 18.1729H25.4423V19.2113H13.5V18.1729Z" fill="#2D75BB"/>
                                        <path d="M4.67285 20.25H25.4421V21.2885H4.67285V20.25Z" fill="#2D75BB"/>
                                        <path d="M4.67285 22.3271H15.0575V23.3656H4.67285V22.3271Z" fill="#2D75BB"/>
                                        <path d="M16.0957 22.3271H20.2495V23.3656H16.0957V22.3271Z" fill="#2D75BB"/>
                                        <path d="M21.2881 22.3271H25.4419V23.3656H21.2881V22.3271Z" fill="#2D75BB"/>
                                        <path d="M25.4419 28.5578H21.2881V27.5193H24.4035V25.4424H25.4419V28.5578Z" fill="#FCEC97"/>
                                        <path d="M5.19238 24.9229H19.7308V28.0382H5.19238V24.9229Z" fill="#F1C056"/>
                                        <path d="M6.75 7.78809H7.78846V8.82655H6.75V7.78809Z" fill="#FCEC97"/>
                                        <path d="M8.82715 9.3457H9.86561V10.3842H8.82715V9.3457Z" fill="#FCEC97"/>
                                    </svg>
                                </label>
                                <div class="input-group">
                                    <textarea placeholder="Comment"class="form-control border"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer">
                            <Link to="/">
                            <button type="button" class="btn-cancel">Cancel</button>
                            </Link>
                            <button type="submit" class="btn_save_schedule">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.3724 4.37237L15.6276 0.627634C15.2258 0.22577 14.6807 2.97177e-06 14.1124 0H2.14286C0.959375 0 0 0.959375 0 2.14286V17.8571C0 19.0406 0.959375 20 2.14286 20H17.8571C19.0406 20 20 19.0406 20 17.8571V5.88759C20 5.31927 19.7742 4.77423 19.3724 4.37237ZM10 17.1429C8.42205 17.1429 7.14286 15.8637 7.14286 14.2857C7.14286 12.7078 8.42205 11.4286 10 11.4286C11.5779 11.4286 12.8571 12.7078 12.8571 14.2857C12.8571 15.8637 11.5779 17.1429 10 17.1429ZM14.2857 3.54821V8.03571C14.2857 8.33156 14.0458 8.57143 13.75 8.57143H3.39286C3.09701 8.57143 2.85714 8.33156 2.85714 8.03571V3.39286C2.85714 3.09701 3.09701 2.85714 3.39286 2.85714H13.5946C13.7367 2.85714 13.873 2.91357 13.9734 3.01406L14.1288 3.16942C14.1785 3.21916 14.218 3.27821 14.2449 3.34321C14.2719 3.4082 14.2857 3.47786 14.2857 3.54821Z" fill="black"/>
                                </svg>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

        :<Loginenforcer />}
    </div>
  );
}


