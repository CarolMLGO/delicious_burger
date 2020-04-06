import React from 'react';
import styles from './Order.module.scss';

const order = (props) => {
	const ingredients = [];
	// // for (let ingredientName in props.ingredients) {
	// // 	ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
	// // }
	Object.entries(props.ingredients).map(cur=> ingredients.push({name:cur[0],amount:Number(cur[1])}));
	const ingredientOutput = ingredients.map ((cur,index) => {
		return <span key={index} style={{textTransform:'capitalize',display:'inline-block', margin:'4px 8px',border:'1px solid #ccc',padding:'5px'}}> {cur.name} ({cur.amount}) </span>
	})

	return (
		<div className={styles.Order} >
			<p style={{textDecoration:'underline'}}> <strong> Order {props.index}: </strong></p>
			<p>Ingredients: {ingredientOutput} </p>
			<p> Price: <strong> USD {props.price} $</strong></p>
		</div>)
};

export default order;
