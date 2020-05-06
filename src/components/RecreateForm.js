import React from 'react';
import countries from "../file/countries.json";

function renderElement (props){
    let arr = props.data;
    let label = '';
    let formfield = [];
    let width = 100/arr.length;
    let uniqueId = props.uniqueId;
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
              formfield.push(<input style = {mystyle} type={fieldData.type}  
                      required={fieldData.required} id={fieldId} name={fieldId}
                      onChange={props.changed} defaultValue={fieldData.value}/>);
               break;
              case('textarea'):
              formfield.push( <textarea style = {mystyle} defaultValue={fieldData.value} 
                      required={fieldData.required} id={fieldId} name={fieldId} 
                      onChange={props.changed}/>);
               break;
              case('radiogroup'):
                  Object.keys(fieldData.values).map((value, index) => {
                      var ids = fieldId+index;
                      formfield .push(<input type="radio" 
                      defaultValue ={fieldData.values[index]} name={fieldId} id={ids}
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
        
                }
                  formfield.push(<select id={fieldId} onChange={props.changed} style = {mystyle}>
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