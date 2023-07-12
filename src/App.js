/*
SAP Calendar app Carl Tallon.
All other points of reference are available in the README.md.
*/

import { Route, Routes } from "react-router-dom";
import "./App.css";
 
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (
    <div id = "background">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div> 
  );
}
  
export default App;
