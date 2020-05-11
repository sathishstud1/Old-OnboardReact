import React from 'react';
import './App.css';
import RecreateForm from './components/RecreateForm';
import FormModel from './components/FormModel';
import customerOnboard from './file/cutomerOnboard.json';
import validator from './components/Validation';
import axios from 'axios';
import createJson from './components/CreateNewJson';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerOnboardJson: customerOnboard,      
      recreateArray:[],
      jsonValues : {}
    };
    
    this.recreateLines = {};
    this.defaultValues = {};
    this.reqFields = [];
    this.addedReqFields = [];
    this.addedFields = [];
    global = this;
  }

  addElements = (lines, refVal) =>{
     let prev; 
     if(!this.state[refVal]){
      this.state[refVal] = [];
     }else{
      prev = this.state[refVal];
      this.state[refVal] = [];
     }
     let arr = [];
     if(prev){
      arr.push(...prev);
     }    
     let divId = refVal + arr.length;
     let removeId = arr.length;
     
     arr.push(<RecreateForm data={lines} 
                            changed={this.onChangeHandler} 
                            id={divId} 
                            uniqueId ={arr.length}
                            remove={()=>this.removeElement(lines,refVal,removeId)}/>);     

     let processFields = validator.addFields(lines, removeId);
     this.addedReqFields = [...this.addedReqFields,...processFields.reqFields];
     this.addedFields = [...this.addedFields,...processFields.allFields];
     let prevJsonvalues = this.state.jsonValues;
     let newJsonValues = {};
     Object.assign(newJsonValues, prevJsonvalues, processFields.defaultValues);     
     this.recreateLines[refVal][removeId] = processFields.addedLines;
     this.state[refVal].push(arr);
     this.setState({[refVal]:arr});
     this.state.jsonValues = newJsonValues;     
     this.setState({jsonValues:newJsonValues});
  };
  
  removeElement = (lines, refVal, removeId) =>{
      let arr = [];
      for(let i=0;i<this.state[refVal].length;i++){
        if(removeId!=i){
            arr.push(this.state[refVal][i]);
        }else{
          arr.push(null);
        }
      }
      this.state[refVal].push(arr);
      this.setState({[refVal]:arr});
      let processFields = validator.removeFields(lines, removeId, this.addedReqFields, this.addedFields, this.state.jsonValues);
      this.addedReqFields = [...processFields.reqFields];
      this.addedFields = [...processFields.allFields];
      Object.assign(this.state.jsonValues, this.state.jsonValues, processFields.defaultValues);
      delete this.recreateLines[refVal][removeId]; 
      console.log(this.state)
     
  };
   
  onChangeHandler = function (e) {
    e.persist();
    if(e.target.type=="radio"){
      global.state.jsonValues[e.target.name] = e.target.value;
    }else{
      global.state.jsonValues[e.target.id] = e.target.value;
    }
  }

  saveform = () =>{
    let customeOnboardNewJson = createJson.create(this.state.jsonValues, this.state.recreateArray,
    this.recreateLines, this.state.customerOnboardJson);
    console.log(customeOnboardNewJson)
    //let validateFields = [...this.reqFields,...this.addedReqFields];
    //let isValid = validator.validateForm(validateFields, this.state.jsonValues);    
    /*var postData = {
      data:JSON.stringify(customeOnboardNewJson)
    }
    axios.post('http://localhost:8080/save-app-details',postData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });*/   

    /*axios.get('http://localhost:8080/findById/100009')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });*/    

  }
  
  searchSSN = () =>{

  }

  exitform = () =>{
    alert('exit')
  }

  componentDidMount() {
    //this.state.jsonValues = this.defaultValues;
    this.setState({ jsonValues: this.defaultValues });
    let linesobj ={};
    Object.keys(this.state.recreateArray).map((recreateIndex, index) => {
      linesobj[this.state.recreateArray[index]] = {};
      Object.assign(this.recreateLines, this.recreateLines, linesobj);
    });    
  }
  
  render() {
    const mystyle = {
      margin:10
     };
    this.reqFields = [];
    this.state.recreateArray = [];
    let items = [];
    let recreateCount = 1;
    let pages = customerOnboard.PageList;
    //Pages
    Object.keys(pages).map((pageIndex, index) => {
      let page = pages[index];
      items.push(<h1>{page.PageTitle}</h1>);
      let categoryList = page.CategoryList;
      //Category List
      Object.keys(categoryList).map((categoryIndex, index) => {
        let category = categoryList[index];
        items.push(<h1>{category.categoryTitle}</h1>);
        let sectionList = category.sectionList;
        //Section List
        Object.keys(sectionList).map((sectionIndex, index) => {
          let section = sectionList[index];
          items.push(<label style={mystyle}>{section.sectionName}</label>);
          let linesList = section.linesList;
          //Lines List
          Object.keys(linesList).map((lineIndex, index) => {
            let line = linesList[index];
            let arr = [];
            let fields = line.fields;
            //Fields List
            Object.keys(fields).map((fieldIndex, index) => {
              var fieldData = fields[index];
              if(fieldData.required){
                this.reqFields.push(fieldData.name);
              }              
              if(fieldData.type=="button"){
                if(fieldData.name==""){
                  fieldData.clicked = this.searchSSN;
                }else if(fieldData.name=="save"){
                  fieldData.clicked = this.saveform;
                }
                else if(fieldData.name=="exit"){
                  fieldData.clicked = this.exitform;
                }
              }else{
                this.defaultValues[fieldData.name] = fieldData.value;
              }
              arr.push(fieldData);
            });//Fields End
            if(arr.length!=0){
              items.push(<FormModel data={arr} changed={this.onChangeHandler}/>);
              items.push(<br/>);
          } 
          });//Lines End
          if(section.recreate!=null && section.recreate){
            let refVal = 'recreate'+recreateCount;
            recreateCount = recreateCount + 1;
            this.state.recreateArray.push(refVal);
            
              items.push(<div contentEditable='true' 
                              id={refVal} 
                              ref={refVal}>
                                {this.state[refVal]}
                          </div>);
              items.push(<button onClick={()=>this.addElements(linesList, refVal)} style={mystyle}
              type="button" >{section.recreatelabel}</button>);
          }
        });//Sections End
      });//Category End
    });//Pages End

    return (
      <div style={{paddingLeft: 200}} key="personalDetails">
        {items}
      </div>
          
    );
  }
}
export default App;