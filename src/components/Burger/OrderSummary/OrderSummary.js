import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../../components/UI/Button/Button';
import styles from './OrderSummary.module.scss';

class  OrderSummary extends Component {
	componentDidUpdate () {
		console.log('[OrderSummary] rendered')
	}

	// shouldComponentUpdate(nextProps,nextState) {
	// 	if(nextProps.)
	// }

	render() {
		const ingredientSummary = this.props.ingredients;
		const items = Object.keys(ingredientSummary).map ((cur,index)=> {
			return <li key={index} className = {styles.List_items} > <span style={{textTransform:'capitalize'}}> {cur} </span>: {ingredientSummary[cur]}</li>
		})

		return (
			<Aux>
				<h3> Your order </h3>
				<p> A delicious burger with the following ingredients: </p>
				<ul className={styles.List}>
					{items}
				</ul>
				<p className={styles.Price}> <strong>Total price: </strong> {this.props.price.toFixed(2)} $</p>
				<p> Continue to Checkout? </p>
				<Button btnType = "Danger" clicked = {this.props.orderCanceled} > Cancel </Button>
				<Button btnType = "Success" clicked = {this.props.orderContinued} > Continue </Button>
			</Aux>
		)
	}
};

export default OrderSummary;