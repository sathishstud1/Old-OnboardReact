import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import SearchApp from "../SearchApp";
import RouteCustomerOnboard from "../RouteCustomerOnboard";
import Landing from "../layout/Landing";
import Login from "../layout/Login";

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Landing} />
        <Route path='/newApplication' exact component={Pages} />
        <Route path='/search' component={Search} />
        <Route path='/:id' component={Pages} />
      </Switch>
    </section>
  );
};

const Pages = () => (
  <div>
    <RouteCustomerOnboard />
  </div>
);

const Search = () => (
  <div>
    <SearchApp />
  </div>
);

export default Routes;
