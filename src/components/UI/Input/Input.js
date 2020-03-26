import React from 'react';
import styles from './Input.module.scss';

const input = (props) => {
	let inputElement = null;
	const inputStyles = [styles.InputElement];
	if(props.invalid && props.shouldValidate) {
		inputStyles.push(styles.Invalid);
	}

	switch(props.elementType) {
		case('input'):
			inputElement = 
				<input 
					className={inputStyles.join(' ')} 
					{...props.elementConfig} 
					value={props.value} 
					onChange = {props.changed}
					id= {props.id}
				/>;
			break;
		case('textarea'):
			inputElement = 
				<textarea 
					className={inputStyles.join(' ')} 
					{...props.elementConfig} 
					value={props.value} 
					onChange = {props.changed}
					id= {props.id}
				/>;
			break;
		case('select'): 
			inputElement = (
				<select className={inputStyles.join(' ')} value={props.value} onChange = {props.changed} id= {props.id}>
					{
						props.elementConfig.options.map (
							cur => <option key = {cur.value} value = {cur.value}> 
									{cur.displayValue} 
								   </option>
						)
					}
				</select>);
			break;
		default:
			inputElement = <input className={inputStyles.join(' ')} {...props.elementConfig} value={props.value} onChange = {props.changed} id= {props.id}/>
	}

	return (
		<div className={styles.Input} >
			<label className={styles.Label} >{props.label}</label>
			{inputElement}
		</div>
	)

};

export default input;