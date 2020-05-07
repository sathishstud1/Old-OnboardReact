import React from 'react';
import './App.css';
import RecreateForm from './components/RecreateForm';
import FormModel from './components/FormModel';
import customerOnboard from './file/cutomerOnboard.json';
import validator from './components/Validation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData : {},
      recreateLinesCount:{},
      recreateLines:{}
    };
    this.jsonValues = {};
    global = this;
    this.reqFields = [];
    this.addedFields = [];
  }

  addElements = (lines, refVal) =>{
     let temp; 
     if(!this.state[refVal]){
      this.state[refVal] = [];
     }else{
      temp = this.state[refVal];
      this.state[refVal] = [];
     }
     let arr = [];
     if(temp){
      arr.push(...temp);
     }    
     let divId = refVal + arr.length;
     let removeId = arr.length;
     arr.push(<RecreateForm data={lines} changed={this.onChangeHandler} id={divId} uniqueId ={arr.length}
                        remove={()=>this.removeElement(lines,refVal,removeId)}/>);
     
     this.state[refVal].push(arr);
     this.setState({[refVal]:arr});
     
     if(!this.state.recreateLinesCount[refVal]){
        this.state.recreateLinesCount[refVal] = 1;
     }else{
        var recreateCount = this.state.recreateLinesCount[refVal];
        recreateCount = recreateCount +1;
        this.state.recreateLinesCount[refVal] = recreateCount;
     }
     let addfields = validator.processMandatoryFields(lines, removeId);
     this.addedFields = [...this.addedFields,...addfields];
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
      var recreateCount = this.state.recreateLinesCount[refVal];
      recreateCount = recreateCount -1;
      this.state.recreateLinesCount[refVal] = recreateCount;
      var newFields = validator.removeMandatoryFields(lines, removeId, this.addedFields);
      this.addedFields = [...newFields];
  };
   
  onChangeHandler = function (e) {
    e.persist();
    if(e.target.type=="radio"){
      global.state.jsonData[e.target.name] = e.target.value;
    }else{
      global.state.jsonData[e.target.id] = e.target.value;
    }   
  }

  saveform = () =>{
    console.log(this.state)    
    let validateFields = [...this.reqFields,...this.addedFields];
    console.log(validateFields)
    let isValid = validator.validateForm(validateFields, this.state.jsonData); 
    console.log(isValid);   
  }
  
  searchSSN = () =>{

  }

  exitform = () =>{
    alert('exit')
  }

  componentDidMount() {
    this.setState({ jsonData: this.jsonValues });
  }
  
  render() {
    const mystyle = {
      margin:10
     };
    this.reqFields = [];
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
                this.jsonValues[fieldData.name] = fieldData.value;
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
            this.state.recreateLines[refVal] = linesList;
              items.push(<div contentEditable='true' id={refVal} ref={refVal}>{this.state[refVal]}</div>);
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