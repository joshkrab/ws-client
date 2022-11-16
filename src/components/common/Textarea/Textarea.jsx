import React, { useId } from 'react';
import Styles from './Textarea.module.css';

export default function Textarea(props) {
	const id = useId();
	return (
		<div className={Styles.Textarea}>
			<label htmlFor={id}>{props.labeltext}</label>
			<textarea
				{...props}
				id={id}
			></textarea>
		</div>
	);
}
