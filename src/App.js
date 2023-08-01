/*
SAP Calendar app Carl Tallon.
All other points of reference are available in the README.md.
ALL IMPORTS MUST BE MODULARRRRRR
*/

import { Route, Routes } from "react-router-dom";
import "./App.css";
 
import Footer from "./components/footer";
import Login from "./components/login";
import Home from "./components/home";
import Account from "./components/account";
import Seat from "./components/seat";
import Newevent from "./components/newevent";
import Register from "./components/register";
import EventDetails from './components/eventdetails';

function App() {
  return (
    <div id = "background" class = "background">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/create" element={<Newevent />} />
        <Route path="/event/:eventId" component={EventDetails} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}
  
export default App;
