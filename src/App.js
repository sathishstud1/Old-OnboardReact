import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);    
  } 
  
  render() {      
    return (
      <BrowserRouter>
        <div > 
          <Home/>    
        </div>
      </BrowserRouter>          
    );
  }
}
export default App;