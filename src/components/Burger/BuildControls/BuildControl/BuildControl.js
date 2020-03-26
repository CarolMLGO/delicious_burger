import React from 'react';
import styles from './BuildControl.module.scss';
import PropTypes from 'prop-types';

const buildControl = (props) => {
	return (
		<div className = {styles.BuildControl} >
			<div className = {styles.Label} style = {{textTransform: 'capitalize'}}> {props.label} </div>
			<button className = {styles.Less} onClick={props.moreBtnClicked} >More</button>
			<button className = {styles.More} onClick = {props.lessBtnClicked} disabled={props.disabled}>Less</button>
			<div className = {styles.Count}> Count: {props.count} </div>
		</div>
	)
};

buildControl.propTypes = {
	btnClicked: PropTypes.func,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	count: PropTypes.number
}

export default buildControl;