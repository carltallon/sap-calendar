/*
SAP Calendar app Carl Tallon.
All other points of reference are available in the README.md.
*/

import { Route, Routes } from "react-router-dom";
import "./App.css";
 
import Footer from "./components/footer";
import Login from "./components/login";
import Home from "./components/home";
import Account from "./components/account";
import Seat from "./components/seat";
import Newevent from "./components/newevent";

function App() {
  return (
    <div id = "background">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/create" element={<Newevent />} />
      </Routes>
      <Footer />
    </div> 
  );
}
  
export default App;
