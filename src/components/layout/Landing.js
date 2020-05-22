import React from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import axios from "axios";

class Landing extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false
      };    
  }

  onSignIn = (googleUser) =>{
    var profile = googleUser.getBasicProfile();
    //console.log('ID: ' + profile.getId());
    //console.log('Name: ' + profile.getName());
    //console.log('Image URL: ' + profile.getImageUrl());
    //console.log('Email: ' + profile.getEmail());
    //console.log('id_token: ' + googleUser.getAuthResponse().id_token);
    //<Link to='/Register' className='btn btn-light'>Request Access</Link>
    localStorage.setItem('login_session_token', googleUser.getAuthResponse().id_token);

   let postData = {
     id_token: googleUser.getAuthResponse().id_token         
   };
    axios.post('http://localhost:8080/verifyGoogleLogin', postData)
   .then(response => {
     if(response.data.status){
       this.setState({ isAuthenticated: true });
     }         
   })
   .catch(error => {
     console.log(error);
   });
}
onSignInFailure = ()=>{
 alert('Login Failed');
}

componentDidMount() {  
  if(!navigator.cookieEnabled) {
    alert('Cookies are disabled!! Please Enable Cookies to Access Application.');
  }
}
  
  render() {      
    if (this.state.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <section className='landing'>
      <div className='dark-overlay' style={{  paddingTop: '25%'}}>
        <div className='landing-inner'>
          <h1 className='x-large'>Digital UnderWritting System</h1>
          <p className='lead'>
            One tool to onboard Customer/Product and Booking
          </p>
          <div className='buttons'>
          <GoogleLogin
                      clientId="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      theme="dark"
                      onSuccess={this.onSignIn}
                      onFailure={this.onSignInFailure}
                      cookiePolicy={'single_host_origin'}
                      style={{paddingLeft: '5%'}}
                    />
           
          </div>
        </div>
      </div>
    </section>
    );
    }
}
export default Landing;