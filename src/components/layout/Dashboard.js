import React from "react";
import Header from './Header';
import LeftNav from './LeftNav';
import axios from "axios";
import { Redirect } from "react-router-dom";


class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          redirect: false
      };
      this.verifyUser();        
  }

  async verifyUser() {    
    let postData = {
      id_token: localStorage.getItem('login_session_token')        
    };
    axios.post('http://localhost:8080/verifyGoogleLogin', postData)
    .then(response => {
      if(response.data.status){
        this.setState({ redirect: false });
      }else{
        this.setState({ redirect: true });
      }         
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }   
    return (
      <div className='white-overlay'>
        <Header/> 
        <LeftNav/>           
    </div>
    );
  }
}
export default Dashboard;