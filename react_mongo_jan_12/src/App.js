// import logo from "./logo.svg";
import React from "react"
import "./App.css";
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';

import Createcustomer from "./components/createcustomer";
import Customer from "./components/customers";
import Userlogin from "./components/login";
import Shop from "./components/shop";
function App() {
  return (
    <div className="App">
      <Router >
        <Routes>
          <Route path="/" element={<Userlogin />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/createcustomer" element={<Createcustomer />} />
          <Route path="/shop" element={<Shop />} />
        </ Routes>
      </Router>

    </div>
  );
}

export default App;
