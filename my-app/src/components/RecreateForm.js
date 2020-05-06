import React from 'react';
import countries from "../file/countries.json";

function renderElement (props){
    let arr = props.data;
    let label = '';
    let formfield = [];
    let width = 100/arr.length;
    const mystyle = {
     margin:10
    };
    Object.keys(arr).map((line, index) => {
        let lineData = arr[index].fields;
        Object.keys(lineData).map((field, index) => {
            let fieldData = lineData[index];
            if(fieldData.type!="button"){
                formfield.push(<label style={mystyle}>{fieldData.label}</label>);
            }
            switch(fieldData.type){
              case('text'): 
              formfield.push(<input style = {mystyle} type={fieldData.type}  
                      required={fieldData.required} id={fieldData.name} name={fieldData.name}
                      onChange={props.changed}/>);
               break;
              case('textarea'):
              formfield.push( <textarea style = {mystyle} value={fieldData.value} 
                      required={fieldData.required} id={fieldData.name} name={fieldData.name} 
                      onChange={props.changed}/>);
               break;
              case('radiogroup'):
                  Object.keys(fieldData.values).map((value, index) => {
                      var ids = fieldData.name+index;
                      formfield .push(<input type="radio" 
                      value ={fieldData.values[index]} name={fieldData.name} id={ids}
                      onChange={props.changed}></input>);
                      formfield.push(<label >{fieldData.values[index]}</label>);
                  });
               break;
              case('select'):
                  var link = fieldData.link;
                  var options = [];
                  if(link=="countries"){
                      options = countries.countries.map((country, key) =>
                          <option value={countries.countries[key].abbreviation}>
                          {countries.countries[key].country}</option>
                      )
                  }else if(link=="states"){
          
                  }
                  formfield.push(<select id={fieldData.name} onChange={props.changed} style = {mystyle}>
                               {options}
                               </select>);
               break;
              default:
                formfield .push( <br/>);
          }
        });

        if(lineData.length!=0){
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

export default RecreateForm;