import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
	<ul className = {styles.NavigationItems} style={{flexDirection:props.flex}}>
		<NavigationItem link='/'  >Burger Builder</NavigationItem>
		<NavigationItem link='/orders' >Orders</NavigationItem>
        <NavigationItem link='/auth' >Authenticate</NavigationItem>
	</ul>
);
export default navigationItems;
