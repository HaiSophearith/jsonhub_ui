import React, { useState } from "react";
import { API_HEADER, BASE_URL, NotifySucess } from "../../redux/Constants";
import { instance } from '../../redux/service/InstanceHeader';
import { useLocation } from 'react-router-dom';

const EditText = ({ initialValue, onSave, projectId}) => {

  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [preControllerName, setPreControllerName] = useState('')

  const handleDoubleClick = (e) => {
    setPreControllerName(e)
    setIsEditing(true);
  };
  const handleInputChange = (e) => {
   const inputValue = e.target.value;
  if (inputValue.includes(' ')) {
    const newValue = inputValue.replace(/ /g, '');
    setValue(newValue);
  } else {
    setValue(inputValue);
  }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    let controllerName = `${value}`
    if(controllerName == ''){
      controllerName = "InitialDirectory"
    }
    console.log("SS: ", projectId)

  instance.get(`/info-controller/${projectId}`)
  .then((info) => {
    const filteredNames = info.data.payload.controllerInfo.map((name) => name.controllerName);
    return filteredNames;
  }).then((allControllerName) => {
    
    if (allControllerName.includes(controllerName) && controllerName !== 'InitialDirectory') {
      let count = 1;
      let newControllerName = controllerName;

      while (allControllerName.includes(newControllerName)) {
        newControllerName = `${controllerName}-0${count}`;
        count++;
      }
      controllerName = newControllerName;

    } else if (controllerName === 'InitialDirectory') {
      let count = 1;
      let newControllerName = controllerName;
      while (allControllerName.includes(newControllerName)) {
        newControllerName = `${controllerName}${count}`;
        count++;
      }
      controllerName = newControllerName;
    }
        instance.get(`/controllerId?controllerName=${preControllerName}&projectId=${projectId}`).then((info)=>{
          let controllerId = info.data.payload
        API_HEADER.put(`${BASE_URL}/update/${controllerId}?newControllerName=${controllerName}`)
      .then(()=>{
        NotifySucess("Edited name successfully.")
        console.log("Successs")}
        ).catch((err)=>{console.log(err)})
      })
  })
  .catch((error) => {
    console.error(error);
  });

    onSave(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (

      <input
        type="text"
        className="font-poppins rounded-lg p-0 text-sm border-none w-[120px]"
        value={value}
        onChange={handleInputChange}  
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  }

  return (
    <span onDoubleClick={() => {handleDoubleClick(value)}}>{value}</span>
  );
};

export default EditText;
