import React from 'react';
import classes from './style.css';
import countries from "../file/countries.json";

class FormModel extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
      let arr = this.props.data;
      let label = '';
      let formfields = [];
      let width = 100/arr.length;
      const mystyle = {
       margin:10
      };
      Object.keys(arr).map((field, index) => {
          let fieldData = arr[field];
          if(fieldData.type!="button"){
            formfields.push(<label style={mystyle}>{fieldData.label}</label>);
          }
          switch(fieldData.type){
            case('text'): 
                formfields.push(<input style = {mystyle} type={fieldData.type}  
                    required={fieldData.required} id={fieldData.name} name={fieldData.name} 
                    onChange={this.props.changed}/>);
             break;
            case('textarea'):
                formfields.push(<textarea style = {mystyle} value={fieldData.value} 
                    required={fieldData.required} id={fieldData.name} name={fieldData.name}
                    onChange={this.props.changed} />);
             break;
            case('radiogroup'):
                Object.keys(fieldData.values).map((value, index) => {
                    var ids = fieldData.name+index;
                    formfields.push(<input type="radio" onChange={this.props.changed} value ={fieldData.values[index]} name={fieldData.name} id={ids}></input>);
                    formfields.push(<label >{fieldData.values[index]}</label>);
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
                formfields.push(<select id={fieldData.name} onChange={this.props.changed} style = {mystyle}>
                {options}
              </select>);
             break;
             case('button'):
                formfields.push(<button onClick={fieldData.clicked} style={mystyle} id={fieldData.name} 
                  type={fieldData.type}>{fieldData.label}</button>);
              
            default:
                formfields.push(<br/>);
        }
      });

    return (
      <div>
        {formfields}
        </div>
    );
  }
}
export default FormModel;