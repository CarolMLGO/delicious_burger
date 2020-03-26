import React from 'react';
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.scss';

const burger = (props) => {
	const transformedIngredients = Object.keys(props.ingredients)
	.map((igKey) => {
		return [...Array(props.ingredients[igKey])]
		.map((_,index)=> <BurgerIngredient key = {igKey+index} type = {igKey} /> )
	});//extract keys of an object and turns them into an array;
	
	const igSum = transformedIngredients.reduce((acc,cur)=>{
		if (cur.length>0) {
			acc+=cur.length
		}
		return acc
	},0)
	

	return(
		<div className = {styles.Burger}>
			<BurgerIngredient type='bread-top' />
			{
				igSum >0 ? transformedIngredients : <p className = {styles.Burger_error}>Please add ingredients!</p>
			}
			
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
};

export default withRouter(burger);