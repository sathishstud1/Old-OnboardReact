import React from "react";
import { withRouter } from "react-router";
import SearchAppjson from "../file/SearchApps.json";
import FormModel from "./FormModel";
import CreateTable from "./CreateTable";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchAppJson: SearchAppjson,
      jsonValues: {},
      searchTable: [],
    };
    this.columnLabels = [];
    this.columnIds = [];
    this.tableLabel = "";
    global = this;
  }

  onChangeHandler = function (e) {
    e.persist();
    global.state.jsonValues[e.target.id] = e.target.value;
  };

  searchHandler = () => {
    console.log(this.state);
    let searchValue = this.state.jsonValues["searchValue"];
    let postData = {
      appid: searchValue,
      columnIds: this.columnIds,
    };
    axios
      .post("http://localhost:8080/findById", postData)
      .then((response) => {
        this.renderTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderTable = (data) => {
    let arr = [];
    arr.push(
      <CreateTable
        columnLabels={this.columnLabels}
        columnIds={this.columnIds}
        data={data}
        tableLabel={this.tableLabel}
      />
    );

    this.state["searchTable"].push(arr);
    this.setState({ ["searchTable"]: arr });
  };

  render() {
    let items = [];
    let sectionList = SearchAppjson.sectionList;
    this.columnLabels = [];
    //Sections
    Object.keys(sectionList).map((sectionIndex, index) => {
      let section = sectionList[index];
      if (typeof section.isSearch != "undefined" && section.isSearch) {
        items.push(<label>{section.sectionName}</label>);
        items.push(
          <FormModel
            data={section.fields}
            searchHandler={this.searchHandler}
            changed={this.onChangeHandler}
          />
        );
      }
      if (typeof section.isTable != "undefined" && section.isTable) {
        this.columnLabels = section.ColumnLabels;
        this.columnIds = section.ColumnIds;
        this.tableLabel = section.sectionName;
        items.push(
          <div contentEditable='true' id='searchTable'>
            {this.state["searchTable"]}
          </div>
        );
      }
    });
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
        <div style={{ paddingLeft: 200 }}>{items}</div>
      </div>
    );
  }
}
export default withRouter(SearchApp);
