import React from "react";
import { Link } from "react-router-dom";

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='buttons' style={{ paddingLeft: "5%", paddingTop: "2%" }}>
        <nav style={{ width: "12%", float: "left" }}>
          <ul>
            <li>
              <Link to='/customerOnboard'>Customer Onboard</Link>
            </li>
            <li>
              <Link to='/businessOnboard'>Business Onboard</Link>
            </li>
            <li>
              <Link to='/productOnboard'>Product Onboard</Link>
            </li>
            <li>
              <Link to='/search'>Search</Link>
            </li>
            <li>
              <Link to='/search'>UW Decision</Link>
            </li>
            <li>
              <Link to='/search'>Booking</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default LeftNav;
