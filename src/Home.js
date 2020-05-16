import React from 'react';
import SearchApp from './components/SearchApp';
import RouteCustomerOnboard from './components/RouteCustomerOnboard';
import {Route, Link, Switch } from 'react-router-dom';

export default function Home() {
  const liStyle = {
    display: 'inline',
    padding: 30
  }
  return (
       <div>  
          <main>
            <nav style={{width: '12%',float: 'left'}}>
              <ul>          
                <li ><Link to="/">Pages</Link></li>
                <li ><Link to="/search"> Seach Application</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route path="/" exact component={Pages} />
              <Route path="/search"  component={Search} />
              <Route path="/:id"  component={Pages} />              
            </Switch>
          </main>        
        </div>
    );
}

const Pages = () => (
  <div>
    <RouteCustomerOnboard/>
  </div>
);

const Search = () => (
  <div>
    <SearchApp/>
  </div>
);