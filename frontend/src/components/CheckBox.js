import { useState } from "react";

function CheckBox({name, updateOptions}) {
  const [checked, setChecked] = useState(false); 
  
  return(
    <label htmlFor={name}>
      <input 
        id={name} 
        name={name} 
        type="checkbox" 
        checked={checked}
        onChange={(e) => {
          setChecked(!checked); 
          updateOptions(e.target.name)
        }}
        onKeyPress={(e) => {
            if(e.key === 'Enter') {
                setChecked(!checked);
                updateOptions(e.target.name);
            }
        }}/>
        {name}
    </label>
  ); 
}

export default CheckBox; 