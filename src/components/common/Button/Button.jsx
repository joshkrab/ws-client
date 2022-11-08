// rfc
import React from 'react';
import Styles from './Button.module.css';

function Button(props) {
	return (
		<button className={Styles.button} {...props}>
			{props.buttontext}
		</button>
	);
}

export default Button;
