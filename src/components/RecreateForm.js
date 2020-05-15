import React from 'react';
import countries from "../file/Dropdowns/countries.json";
import states from "../file/Dropdowns/states.json";

class RecreateForm extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {     
      stateOptions : []
    }; 
    global = this;      
  }

changeState = function (e) {
      e.persist();      
      global.setState({stateOptions:global.getStates(e.target.value)});
}

getStates = (country)=>{
  let statesList = states[country];
  let options = [];
  statesList.map((stateKey, key) =>{
    let state = statesList[key];
    options.push(<option value={state.value}>{state.label}</option>);
  });
  return options;
}

componentDidMount() {
  this.setState({stateOptions:this.props.defaultStates});
}

  render() {
    let arr = this.props.data;
    let formfield = [];
    let width = 100/arr.length;
    let uniqueId = this.props.uniqueId;
    let arrLength = arr.length;
    const mystyle = {
     margin:10
    };
    Object.keys(arr).map((line, index) => {
        let lineData = arr[index].fields;
        Object.keys(lineData).map((field, index) => {
            let fieldData = lineData[index];
            let fieldId = fieldData.name + uniqueId;
            if(fieldData.type!="button"){
                formfield.push(<label style={mystyle}>{fieldData.label}</label>);
            }
            switch(fieldData.type){
              case('text'): 
              formfield.push(<input style = {mystyle} 
                                    type={fieldData.type}  
                                    required={fieldData.required} 
                                    id={fieldId} name={fieldId}
                                    onChange={this.props.changed} 
                                    defaultValue={fieldData.value}
                                    />);
               break;
              case('textarea'):
              formfield.push( <textarea style = {mystyle} 
                                        defaultValue={fieldData.value} 
                                        required={fieldData.required} 
                                        id={fieldId} 
                                        name={fieldId}                                        
                                        onChange={this.props.changed}/>);
               break;
              case('radiogroup'):
                  Object.keys(fieldData.values).map((value, index) => {
                      var ids = fieldId+index;
                      formfield .push(<input type="radio" 
                                             defaultValue ={fieldData.values[index]} 
                                             name={fieldId} 
                                             id={ids}                                             
                                             onChange={this.props.changed}></input>);
                      formfield.push(<label >{fieldData.values[index]}</label>);
                  });
               break;
              case('select'):
                  var link = fieldData.link;
                  var options = [];
                  if(link=="countries"){
                    countries.countries.map((cntry, key) =>{
                      let country = countries.countries[key];
                      if(typeof country.isSelected!='undefined' && country.isSelected!=null){
                        options.push(<option value={country.abbreviation} selected>{country.country}</option>);
                      }else if(typeof country.available!='undefined' && country.available!=null){
                        options.push(<option value={country.abbreviation}>{country.country}</option>);
                      }else{
                        options.push(<option value={country.abbreviation} disabled>{country.country}</option>);
                      }                    
                      
                    })
                }else if(link=="states"){
                  let statesList = states.US;
                  statesList.map((stateKey, key) =>{
                    let state = statesList[key];
                    options.push(<option value={state.value}>{state.label}</option>);
                  });
                }
                if(link=="countries"){
                  formfield.push(<select id={fieldId} 
                                         onBlur = {this.props.changed}
                                         onChange={this.changeState} 
                                         style = {mystyle}>
                                   {options}
                                </select>);
                }else if(typeof fieldData.dependent!='undefined' && fieldData.dependent){ 
                  formfield.push(<select id={fieldId} 
                                         onChange={this.props.changed} 
                                         style = {mystyle}>
                                    {this.state.stateOptions}
                                  </select>);
                }else{
                  formfield.push(<select id={fieldId} 
                                        onChange={this.props.changed} 
                                        style = {mystyle}>
                                      {options}
                              </select>);
                }
                 
               break;
              default:
                formfield .push( <br/>);
          }
        });

        if(lineData.length!=0 && index!=arrLength-1){
            formfield .push( <br/>);
        }
        
    });
    return (
      <div>
          {formfield}
          <button onClick={this.props.remove} style={{margin:10}} type="button" >Remove</button>
      </div>
    );
  }
}
export default RecreateForm;

/*function renderElement (props){
    let arr = props.data;
    let label = '';
    let formfield = [];
    let width = 100/arr.length;
    let uniqueId = props.uniqueId;
    let arrLength = arr.length;
    const mystyle = {
     margin:10
    };
    Object.keys(arr).map((line, index) => {
        let lineData = arr[index].fields;
        Object.keys(lineData).map((field, index) => {
            let fieldData = lineData[index];
            let fieldId = fieldData.name + uniqueId;
            if(fieldData.type!="button"){
                formfield.push(<label style={mystyle}>{fieldData.label}</label>);
            }
            switch(fieldData.type){
              case('text'): 
              formfield.push(<input style = {mystyle} 
                                    type={fieldData.type}  
                                    required={fieldData.required} 
                                    id={fieldId} name={fieldId}
                                    onChange={props.changed} 
                                    defaultValue={fieldData.value}
                                    />);
               break;
              case('textarea'):
              formfield.push( <textarea style = {mystyle} 
                                        defaultValue={fieldData.value} 
                                        required={fieldData.required} 
                                        id={fieldId} 
                                        name={fieldId}                                        
                                        onChange={props.changed}/>);
               break;
              case('radiogroup'):
                  Object.keys(fieldData.values).map((value, index) => {
                      var ids = fieldId+index;
                      formfield .push(<input type="radio" 
                                             defaultValue ={fieldData.values[index]} 
                                             name={fieldId} 
                                             id={ids}                                             
                                             onChange={props.changed}></input>);
                      formfield.push(<label >{fieldData.values[index]}</label>);
                  });
               break;
              case('select'):
                  var link = fieldData.link;
                  var options = [];
                  if(link=="countries"){
                    countries.countries.map((cntry, key) =>{
                      let country = countries.countries[key];
                      if(typeof country.isSelected!='undefined' && country.isSelected!=null){
                        options.push(<option value={country.abbreviation} selected>{country.country}</option>);
                      }else if(typeof country.available!='undefined' && country.available!=null){
                        options.push(<option value={country.abbreviation}>{country.country}</option>);
                      }else{
                        options.push(<option value={country.abbreviation} disabled>{country.country}</option>);
                      }                    
                      
                    })
                }else if(link=="states"){
                  let statesList = states.US;
                  statesList.map((stateKey, key) =>{
                    let state = statesList[key];
                    options.push(<option value={state.value}>{state.label}</option>);
                  });
                }
                if(typeof fieldData.dependent!='undefined' && fieldData.dependent){
                  
                  formfield.push(<select id={fieldId} 
                                         onChange={props.changed} 
                                         style = {mystyle}>
                                    {props.stateOptions[fieldData.name+uniqueId]}
                                  </select>);
                }else{
                  formfield.push(<select id={fieldId} 
                                        onChange={props.changed} 
                                        style = {mystyle}>
                                      {options}
                              </select>);
                }
                 
               break;
              default:
                formfield .push( <br/>);
          }
        });

        if(lineData.length!=0 && index!=arrLength-1){
            formfield .push( <br/>);
        }
        
    });

    return formfield;
}

const RecreateForm = props => (
      <div id= {props.id}>
          {renderElement (props)}
          <button onClick={props.remove} style={{margin:10}} type="button" >Remove</button>
      </div>
)

export default RecreateForm;*/