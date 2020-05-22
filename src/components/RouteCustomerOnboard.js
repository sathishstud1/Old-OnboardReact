import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import customerOnboardJson from "../file/cutomerOnboard.json";
import CustomerOnboard from "./CustomerOnboard";

class RouteCustomerOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.appId = this.props.match.params.id;
    this.json = customerOnboardJson;
    if (typeof this.appId != "undefined" && this.appId != "") {
      this.getJson();
    } else {
      this.state.loading = false;
    }
  }

  async getJson() {
    let postData = {
      appId:this.appId
    };
    return axios
      .post("http://localhost:8080/getJson" ,postData)
      .then((response) => {
        if(response.data.status){
            this.json = JSON.parse(response.data.data);
            this.setState({ loading: false });
        }      
      });
  }

  
  render() {
    if (this.state.loading) {
      return <div className='white-overlay'><span>Loading....</span></div>;
    }
    return (
    <div className='white-overlay'>
     
      <CustomerOnboard json={this.json} />       
    </div>   
    );
  }
}
export default withRouter(RouteCustomerOnboard);
