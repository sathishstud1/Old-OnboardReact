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
              <Link to='/search'>Customer Search</Link>
            </li>
            <li>
              <Link to='/newApplication'>Create Application</Link>
            </li>
            <li>
              <Link to='/search'>Application Search</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default LeftNav;
