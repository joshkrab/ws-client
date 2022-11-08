// rfc
import React from 'react';
import classes from './MySelect.module.css';

const MySelect = ({ options, defaultValue, value, onChange }) => {
   return (
      <select
         value={value}
         // Визиваємо функцію з пропсів, посилаючи туди значення поточного елементу (target.value) при зміні селекту
         onChange={(event) => onChange(event.target.value)}
         className={classes.mySelect}
         name=""
         id=""
      >
         <option disabled value="">
            {defaultValue}
         </option>
         {options.map((item) => (
            // Записуємо в кожну опцію по одному елементу масива options: value та name
            <option key={item.value} value={item.value}>
               {item.name}
            </option>
         ))}
      </select>
   );
};

export default MySelect;
