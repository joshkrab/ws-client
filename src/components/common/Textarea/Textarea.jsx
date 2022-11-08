import React, { useId } from 'react';
import Styles from './Textarea.module.css';

export default function Textarea({ labeltext, placeholder, onChange }) {
	const id = useId();
	return (
		<div className={Styles.Textarea}>
			<label htmlFor={id}>{labeltext}</label>
			<textarea
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				id={id}
			></textarea>
		</div>
	);
}
