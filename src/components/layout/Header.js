import React from "react";
import { gapi } from 'gapi-script';
import {  Redirect } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        global = this;
    }

    signOut =()=> {
        if(typeof gapi.auth2=='undefined'){
            global.setState({ redirect: true });
            return;
        }
        var auth2 = gapi.auth2.getAuthInstance();
        if(auth2){
            auth2.signOut().then(function () {
                localStorage.removeItem('login_session_token');
                global.setState({ redirect: true });
              });
        }else{
            global.setState({ redirect: true });
        }
       
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }      
      return (
        <div> 
        <head>        
            <script src="https://apis.google.com/js/platform.js" async defer></script>
            <meta name="google-signin-client_id" content="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"></meta>
        </head>
            <div>              
                <h1 className='x-large' style={{width: '80%',float: 'left'}}>Digital UnderWritting System</h1>
                <button onClick={this.signOut} 
                        ref="signoutBtn"
                        type="button" 
                        style={{margin: '2%',backgroundColor: 'red'}}>Log Out</button> 
            </div>                       
        </div>
      );
    }
  }
  export default Header;