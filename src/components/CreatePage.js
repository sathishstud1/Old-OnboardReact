import React from 'react';
import FormModel from './FormModel';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);    
    this.reqFields = [];
    this.recreateArray = [];
    this.defaultValues = {};
  } 

  componentDidMount() {
    this.props.loadPageDefaults(this.reqFields,this.recreateArray,this.defaultValues);    
  }
  
  render() {
    const mystyle = {
      margin:10
     };
    this.reqFields = [];
    this.recreateArray = [];
    let items = [];
    let recreateCount = 1;
    let page = this.props.Page;
      //items.push(<h1>{page.PageTitle}</h1>);
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
                  fieldData.clicked = this.props.searchSSN;
                }else if(fieldData.name=="save"){
                  fieldData.clicked = this.props.saveform;
                }
                else if(fieldData.name=="exit"){
                  fieldData.clicked = this.props.exitform;
                }
              }else{
                this.defaultValues[fieldData.name] = fieldData.value;
              }
              arr.push(fieldData);
            });//Fields End
            if(arr.length!=0){
              items.push(<FormModel data={arr} 
                                    changed={this.props.changed}
                                    stateOptions={this.props.stateOptions}/>);
              items.push(<br/>);
          } 
          });//Lines End
          if(section.recreate!=null && section.recreate){
            let refVal = 'recreate'+this.props.PageId+recreateCount;
            recreateCount = recreateCount + 1;
            this.recreateArray.push(refVal);
            
              items.push(<div contentEditable='true' 
                              id={refVal} 
                              ref={refVal}>
                                {this.props.addrecreateDiv(refVal)}
                          </div>);
              items.push(<button onClick={()=>this.props.addElements(linesList, refVal)} style={mystyle}
              type="button" >{section.recreatelabel}</button>);
              items.push(<br/>);
          }
        });//Sections End
      });//Category End

    return (
      <div>
        {items}
      </div>
          
    );
  }
}
export default CreatePage;