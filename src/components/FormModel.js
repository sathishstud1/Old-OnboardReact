import React from 'react';
import countries from "../file/Dropdowns/countries.json";

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
              formfields.push(<input style = {mystyle} 
                                      type={fieldData.type}  
                                      required={fieldData.required} 
                                      id={fieldData.name} 
                                      name={fieldData.name} 
                                      ref={fieldData.name}
                                      onChange={this.props.changed} 
                                      defaultValue={fieldData.value} />);
             break;
            case('textarea'):
                formfields.push(<textarea style = {mystyle} 
                                defaultValue={fieldData.value} 
                                required={fieldData.required} 
                                id={fieldData.name} 
                                name={fieldData.name} 
                                ref={fieldData.name}
                                onChange={this.props.changed} />);
             break;
            case('radiogroup'):
                Object.keys(fieldData.values).map((value, index) => {
                    var ids = fieldData.name+index;
                    formfields.push(<input type="radio" 
                                    onChange={this.props.changed} 
                                    defaultValue ={fieldData.values[index]} 
                                    name={fieldData.name} 
                                    id={ids} 
                                    ref={fieldData.name}></input>);
                    formfields.push(<label >{fieldData.values[index]}</label>);
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
        
                }else if(link=="self"){
                  var optList = fieldData.options;
                  optList.map((optIndex, key) =>{
                    let opt = optList[key];
                    options.push(<option value={opt.value}>{opt.label}</option>);
                  });
                }
                formfields.push(<select ref={fieldData.name} 
                                        id={fieldData.name} 
                                        onChange={this.props.changed} 
                                        style = {mystyle}>
                                  {options}
                                </select>);
             break;
             case('button'):
              if(fieldData.name=="searchBtn"){
                formfields.push(<button onClick={this.props.searchHandler} style={mystyle} id={fieldData.name} 
                  type={fieldData.type}>{fieldData.label}</button>);   
              }else{
                formfields.push(<button onClick={fieldData.clicked} 
                                        style={mystyle} id={fieldData.name} 
                                        type={fieldData.type}>
                                    {fieldData.label}
                                </button>);   
              }
                              
              break;
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