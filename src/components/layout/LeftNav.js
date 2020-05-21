import React from "react";
import { Link } from "react-router-dom";

class LeftNav extends React.Component {
    constructor(props) {
        super(props);       
    }  

    render() {
          
      return (
        <div className='buttons' style={{paddingLeft:'5%', paddingTop:'1%'}}>
            <nav style={{ width: "12%", float: "left" }}>
            <ul>            
                <li>
                <Link to='/newApplication'>Create Application</Link>
                </li>
                <li>
                <Link to='/search'> Seach Application</Link>
                </li>
            </ul>
            </nav>
        </div> 
      );
    }
  }
  export default LeftNav;