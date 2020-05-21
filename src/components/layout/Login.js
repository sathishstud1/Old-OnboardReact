import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import GoogleLogin from 'react-google-login';

class Login extends React.Component {
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
   
    render() {      
      if (this.state.isAuthenticated) {
        return <Redirect to='/dashboard' />;
      }
      return (
        <div className='white-overlay'>                   
            <h1 className='x-large' style={{width: '80%',float: 'left'}}>Digital UnderWritting System</h1>
            <div className='buttons'>
                <nav style={{ width: "25%", paddingLeft: '5%'}}>
                  <ul style={{paddingBottom: '10%'}}>
                      <li>
                      <Link to='/home'>Home</Link>
                      </li>            
                  </ul>
                  <ul>
                  <GoogleLogin
                      clientId="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      theme="dark"
                      onSuccess={this.onSignIn}
                      onFailure={this.onSignInFailure}
                      cookiePolicy={'single_host_origin'}
                      style={{paddingLeft: '5%'}}
                    />
                    </ul>
                </nav>
            </div>
            
        </div>
      );
    }
  }
  export default Login;