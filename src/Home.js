import React from 'react';
import CustomerOnboard from './components/CustomerOnboard';
import SearchApp from './components/SearchApp';
import {Route, Link, Switch, Redirect } from 'react-router-dom';

export default function Home() {
  const liStyle = {
    display: 'inline',
    padding: 30
  }
  return (
       <div>  
          <main>
            <nav>
              <ul>          
                <li ><Link to="/">Pages</Link></li>
                <li ><Link to="/search"> Seach Application</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route path="/" exact component={Pages} />
              <Route path="/search"  component={Search} />              
            </Switch>
          </main>        
        </div>
    );
}

const Pages = () => (
  <div>
    <CustomerOnboard/>
  </div>
);

const Search = () => (
  <div>
    <SearchApp/>
  </div>
);