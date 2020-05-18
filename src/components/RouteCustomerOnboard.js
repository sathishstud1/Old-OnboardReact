import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import customerOnboardJson from "../file/cutomerOnboard.json";
import CustomerOnboard from "./CustomerOnboard";
import { Link, Redirect } from "react-router-dom";

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
    return axios
      .get("http://localhost:8080/getJson/" + this.appId)
      .then((response) => {
        this.json = response.data;
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <span>Loading....</span>;
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
        <div>
          <CustomerOnboard json={this.json} />
        </div>
      </div>
    );
  }
}
export default withRouter(RouteCustomerOnboard);
