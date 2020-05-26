import React from "react";
import {Redirect} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import axios from "axios";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    onSignIn = (googleUser) => {
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
                if (response.data.status) {
                    this.setState({isAuthenticated: true});
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    onSignInFailure = () => {
        alert('Login Failed');
    }

    componentDidMount() {
        if (!navigator.cookieEnabled) {
            alert('Cookies are disabled!! Please Enable Cookies to Access Application.');
        }
    }

    render() {
        if (this.state.isAuthenticated) {
            return <Redirect to='/dashboard'/>;
        }
        return (
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-12 col-xl-10">
                    <div className="card shadow-lg o-hidden border-0 my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="flex-grow-1 bg-login-image"
                                         style={
                                             {
                                                 backgroundPosition: '50%',
                                                 backgroundSize: 'cover',
                                                 backgroundImage: 'url("./assets/images/image3.jpeg")'
                                             }
                                         }/>
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h4 className="text-dark mb-4">Welcome Back!</h4>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input className="form-control form-control-user"
                                                       type="email"
                                                       id="exampleInputEmail"
                                                       aria-describedby="emailHelp"
                                                       placeholder="Enter Email Address..."
                                                       name="email"/>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-control form-control-user"
                                                       type="password"
                                                       id="exampleInputPassword"
                                                       placeholder="Password"
                                                       name="password"/></div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <div className="form-check">
                                                        <input className="form-check-input custom-control-input"
                                                               type="checkbox"
                                                               id="formCheck-1"/>
                                                        <label className="form-check-label custom-control-label"
                                                               htmlFor="formCheck-1">Remember Me
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center text-center">
                                                <button className="w-50 btn btn-primary">Login</button>
                                            </div>
                                            <hr/>
                                            <div className="text-center">
                                            <GoogleLogin
                                                clientId="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"
                                                buttonText="Login with Google"
                                                theme="dark"
                                                onSuccess={this.onSignIn}
                                                onFailure={this.onSignInFailure}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                            </div>
                                            <hr/>
                                        </form>
                                        <div className="text-center">
                                            <a className="small"
                                               href="#">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small"
                                               href="#">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
