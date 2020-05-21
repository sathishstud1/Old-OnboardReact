import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";

export default function App() {
  return (
    <Router>
       <Switch>
          <Route component={Routes} />
        </Switch>
    </Router>
  );
}
