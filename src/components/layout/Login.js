import React from "react";
import { Link, Redirect } from "react-router-dom";

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='white-overlay'>
      <h1 className='x-large'>Digital UnderWritting System</h1>
      <div className='buttons'>
        <nav style={{ width: "12%", float: "left" }}>
          <ul>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/newApplication'>Create Application</Link>
            </li>
            <li>
              <Link to='/search'> Seach Application</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Login;
