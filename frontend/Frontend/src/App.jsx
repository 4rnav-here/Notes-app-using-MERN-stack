import React from "react";
import Home  from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
const routes = () =>{
  return( 
   <Router>
    <Routes>
      <Route path= "/dashboard" exact element={<Home />} />
      <Route path= "/login" exact element={<Login />} />
      <Route path= "/signup" exact element={<Signup />} />
    </Routes>
  </Router>
  );
};

const App = () => {
  return (
    <div>
      {routes()}
    </div>
  );
};

export default App;
