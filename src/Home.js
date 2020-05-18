import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";

export default function Home() {
  const liStyle = {
    display: "inline",
    padding: 30,
  };
  return (
    <div>
      <main>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </main>
    </div>
  );
}
