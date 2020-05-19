import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Digital UnderWritting System</h1>
          <p className='lead'>
            One tool to onboard Customer/Product and Booking
          </p>
          <div className='buttons'>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
            <Link to='/Register' className='btn btn-light'>
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Landing;
