import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.scss';

const logo = (props) => (
	<div className = {styles.Logo}>
		<img src={burgerLogo} alt= "Delicious burger " />
	</div>
);

export default logo;