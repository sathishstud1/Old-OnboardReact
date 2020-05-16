import React from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import customerOnboardJson from '../file/cutomerOnboard.json';
import CustomerOnboard from './CustomerOnboard';

class RouteCustomerOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading : true
    }
    this.appId = this.props.match.params.id;
    this.json = customerOnboardJson;
    if(typeof this.appId!='undefined' && this.appId!=""){
        this.getJson();
    }else{
        this.state.loading = false;
    }
  }
  
  async getJson () {    
        return axios.get('http://localhost:8080/getJson/'+this.appId).then((response)=>{
            this.json = response.data
            this.setState({loading:false});
        });
  }

  render() {
   
    if(this.state.loading){
        return <span>Loading....</span>
    }   
    return (
        <div > 
           <CustomerOnboard json={this.json}/>
        </div>        
    );
  }
}
export default  withRouter(RouteCustomerOnboard);