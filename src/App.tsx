import { Container } from "react-bootstrap";
import Signup from "./Components/Auth/Signup";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Auth/Login";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
