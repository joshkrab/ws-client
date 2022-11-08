import React from 'react';
import classes from './MyInput.module.css';

// Щоб працював useRef() хукі з компонентом інпуту, треба компонент ще обернути в функцію React.forwardRef()
// Тоді ми приймаємо в пропсах посилання  ref
const MyInput = React.forwardRef((props, ref) => {
   return <input ref={ref} className={classes.myInput} {...props} />;
});

export default MyInput;
