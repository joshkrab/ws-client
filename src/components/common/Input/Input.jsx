import React, { useId } from 'react';
import styles from './Input.module.css';

export default function Input(props) {
	const id = useId();
	return (
		<div className={styles.inputBody}>
			<label className={styles.label} htmlFor={id}>
				{props.labeltext}
			</label>
			<input
				{...props}
				className={styles.input}
				id={id}
				type='text'
				placeholder={props.placeholder}
				value={props.value}
			/>
		</div>
	);
}
