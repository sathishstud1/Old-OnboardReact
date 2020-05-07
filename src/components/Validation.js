this.processMandatoryFields = (lines, id) =>{
    let mandatoryFields = []
    Object.keys(lines).map((lineIndex, index) => {
      let line = lines[index];
      let fields = line.fields;
      //Fields List
      Object.keys(fields).map((fieldIndex, index) => {
        var fieldData = fields[index];
        if(fieldData.required){
          mandatoryFields.push(fieldData.name+id);
        } 
      });//Fields End
    });//Lines End
    return mandatoryFields;
}

this.removeMandatoryFields = (lines, id, addedFields) =>{
    Object.keys(lines).map((lineIndex, index) => {
      let line = lines[index];
      let fields = line.fields;
      //Fields List
      Object.keys(fields).map((fieldIndex, index) => {
        var fieldData = fields[index];
        if(fieldData.required){
            addedFields.pop(fieldData.name+id);
        } 
      });//Fields End
    });//Lines End
    return addedFields;
}

this.validateForm = (validateFields, jsonData) =>{
    let flag = true;
    Object.keys(validateFields).map((field, index) => {
      var key = validateFields[index];
      var value = jsonData[key];
      if(value==null || typeof value=='undfined' || value==''){
        console.log(key +' is Required.');
        flag = false;
      }
    });
    return flag;
  }