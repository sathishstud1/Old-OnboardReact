import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}
