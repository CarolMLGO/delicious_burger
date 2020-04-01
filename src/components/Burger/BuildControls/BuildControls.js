import React from 'react';
import styles from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';
// import PropTypes from 'prop-types';

// const controls = [
// 	{label:'Salad',type:'salad'},
// 	{label:'Bacon',type:'bacon'},
// 	{label:'Cheese',type:'cheese'},
// 	{label:'Meat',type:'meat'}
// ]

const buildControls = (props) => {
	return (
		<div className = {styles.BuildControls}>
			<p className = {styles.Price} > Total Price: <strong> {props.price.toFixed(2)} $</strong> </p>
			{ 
				Object.keys(props.ingredients).map((cur)=>{
				return <BuildControl 
					key = {cur} 
					label = {cur} 
					count = {props.ingredients[cur]}
					moreBtnClicked = {()=> props.moreIg(cur)} 
					lessBtnClicked = {()=> props.lessIg(cur)}
					disabled = {props.disabled[cur]}
					/> 
				})
			}
			<button className={styles.btn} disabled={!props.order} onClick = {props.clicked}>
				{props.isAuth? 'order now':"Sign Up to order"}
			</button>
		</div>
	)
};

// buildControls.propTypes = {
// 	price: PropTypes.number,
// 	ingredients: PropTypes.object,
	
// }

export default buildControls;