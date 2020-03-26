import React from 'react';
import styles from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';

const toolbar = (props) => (
	<header className={styles.Toolbar}>
		<ToggleButton clicked={props.toggled}/>
		<div className={styles.Logo}>
			<Logo />
		</div>
		<div className={styles.DesktopOnly}>
			<NavigationItems />
		</div>
	</header>
) ;

export default toolbar;