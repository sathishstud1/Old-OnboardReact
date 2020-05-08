//Add fields 
this.addFields = (lines, id) =>{
    let processFields = {
      "reqFields":[],
      "allFields":[],
      "defaultValues":{}
    }
    Object.keys(lines).map((lineIndex, index) => {
      let line = lines[index];
      let fields = line.fields;
      //Fields List
      Object.keys(fields).map((fieldIndex, index) => {
        var fieldData = fields[index];
        processFields.allFields.push(fieldData.name+id);
        processFields.defaultValues[fieldData.name+id] = fieldData.value;
        if(fieldData.required){
          processFields.reqFields.push(fieldData.name+id);
        } 
      });//Fields End
    });//Lines End
    return processFields;
}

//Remove Fields
this.removeFields = (lines, id, addedReqFields, addedFields, jsonValues) =>{
  let processFields = {
    "reqFields":[],
    "allFields":[],
    "defaultValues":{}
  }
    Object.keys(lines).map((lineIndex, index) => {
      let line = lines[index];
      let fields = line.fields;
      //Fields List
      Object.keys(fields).map((fieldIndex, index) => {
        var fieldData = fields[index];
        
        addedFields.pop(fieldData.name+id);
        if(fieldData.required){
          addedReqFields.pop(fieldData.name+id);
        }
        delete jsonValues[fieldData.name+id];
      });//Fields End
    });//Lines End
    processFields.reqFields = addedReqFields;
    processFields.allFields = addedFields;
    processFields.defaultValues = jsonValues;
    return processFields;
}

//Vaildate form fields
this.validateForm = (validateFields, jsonValues) =>{
    let flag = true;
    Object.keys(validateFields).map((field, index) => {
      var key = validateFields[index];
      var value = jsonValues[key];
      if(value==null || typeof value=='undfined' || value==''){
        console.log(key +' is Required.');
        flag = false;
      }
    });
    return flag;
  }