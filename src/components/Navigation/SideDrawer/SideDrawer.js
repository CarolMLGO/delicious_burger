import React,{Fragment} from 'react';
import styles from './SideDrawer.module.scss';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
	let attachedStyles = [styles.SideDrawer,styles.Close];
	if (props.open) {
		attachedStyles = [styles.SideDrawer,styles.Open];
	}
	
	return (
		<Fragment>
			<Backdrop show={props.open} clicked = {props.closed}/>
			<div className={attachedStyles.join(' ')} onClick={props.closed}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<div>
					<NavigationItems flex="column"/>
				</div>
			</div>
		</Fragment>
	)
};

export default sideDrawer;

