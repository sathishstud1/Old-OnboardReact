import React from "react";
import Header from './Header';
import LeftNav from './LeftNav';

class Dashboard extends React.Component {
  constructor(props) {
      super(props);         
  } 
  
  render() {    
    return (
      <div className='white-overlay'>
        <Header/> 
        <LeftNav/>           
    </div>
    );
  }
}
export default Dashboard;