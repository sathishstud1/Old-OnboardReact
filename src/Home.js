import React from 'react';
import CustomerOnboard from './components/CustomerOnboard';
import SearchApp from './components/SearchApp';
import {Route, Link, Switch, Redirect } from 'react-router-dom';

class Home extends React.Component { 
    constructor(props) {
        super(props)
    }
    
  render() {
      const liStyle = {
        display: 'inline',
        padding: 30
      }
      
    return (
        <div> 
          <header>
            <nav>
              <li style={liStyle}><Link to="/">Pages</Link></li>
              <li style={liStyle}><Link to="/search"> Seach Application</Link></li>
            </nav>
          </header> 
          <Switch> 
              <Route Path = '/search' component={SearchApp}></Route>         
              <Route exact Path ='/' component={CustomerOnboard}></Route>
          </Switch>         
        </div>
    );
  }
}
export default Home;