import React from 'react';
import classes from './style.css';
import {Link} from 'react-router-dom';


const resptable ={
    width: '80%',
    display: 'table'
    }
 const resptableheader={
    display: 'table-header-group',
    backgroundColor: 'gray',
    fontWeight: 'bold',
    fontize: 25
}
const tableheadercell = {
    display: 'table-cell',
    padding: 10,
    textAlign: 'center',
    borderBottom: '1 solid black'
}
const resptablebody = {
    display: 'table-row-group'
}
  const resptablerow = {
    display: 'table-row'
}
  const tablebodycell = {
    display: 'table-cell',
    textAlign: 'center'
}
function renderHeader (columnLabels){    
    let items = [];
    items.push(<div style={tableheadercell}>Open Record</div>);
    Object.keys(columnLabels).map((columnIndex, index) => {
        items.push(<div style={tableheadercell}>{columnLabels[index]}</div>);
    });   
    return items;
}

function renderBody (columnIds, data){    
    let arr = [];
    Object.keys(data).map((dataIndex, index) => {
        let row = JSON.parse(data[index]);   
        arr.push(<div style={resptablerow}>
            <div style={tablebodycell}><Link to = {'/'+row['appId']}>{row['appId']}</Link></div>            
            {getCells(columnIds,row)}
            </div>);      
      }); 
    return arr;
}

function getCells(columnIds,row){
    let arr = [];
    Object.keys(columnIds).map((columnIndex, index) => {
        arr.push(<div style={tablebodycell}>{row[columnIds[index]]}</div>);
    });
    return arr;
}

function openRecord(appId){
 alert(appId)
}

const CreateTable = props => (
      <div>
          <label>{props.tableLabel}</label>
          <div style={resptable}>
            <div style={resptableheader}>
                {renderHeader (props.columnLabels)}
            </div>            
            <div style={resptablebody}>
                {renderBody (props.columnIds, props.data)}
            </div>

          </div>
      </div>
)

export default CreateTable;