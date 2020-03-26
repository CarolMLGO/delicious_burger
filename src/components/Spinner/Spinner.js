import React from 'react';
import styles from './Spinner.module.scss';

//SVG spinner
const spinner = () => (
	<div className = {styles.Loader}>
		<svg>
			<use xlinkHref = '/SVG/icons.svg#icon-cw' />
		</svg>
	</div>
);

//CSS spineer
// const spinner = () => (
// 	<div className = {styles.Loader} >Loading...</div>
// );

export default spinner;