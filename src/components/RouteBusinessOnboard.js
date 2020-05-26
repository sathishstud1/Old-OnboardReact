import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import businessOnboardJson from "../file/businessOnboard.json";
import CustomerOnboard from "./CustomerOnboard";
import '../App.css';
import '../index.css';

class RouteBusinessOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.appId = this.props.match.params.id;
    this.json = businessOnboardJson;
    if (typeof this.appId != "undefined" && this.appId != "") {
      this.getJson();
    } else {
      this.state.loading = false;
    }
  }

  async getJson() {
    let postData = {
      appId: this.appId,
    };
    return axios
      .post("http://localhost:8080/getJson", postData)
      .then((response) => {
        if (response.data.status) {
          this.json = JSON.parse(response.data.data);
          this.setState({ loading: false });
        }
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='white-overlay'>
          <span>Loading....</span>
        </div>
      );
    }
    return (
      <div className='white-overlay'>
        <CustomerOnboard json={this.json} />
      </div>
    );
  }
}
export default withRouter(RouteBusinessOnboard);
