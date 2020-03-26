import React, {Component} from 'react';
// import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import styles from './BurgerBuilder.module.scss';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order'; //import axios instance

import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// ingredients: null,
			// totalPrice: 5, // ingredients and totalPrice are appropriate to be managed by Redux
			order: true,//purchasable or not, used in BuildControls, switch order button to disable, UI
			showOrderSummary: false,// show modal or not
			// loading: false, //show spinner or not, in modal, waiting for response after clicking continue
		}
	};

	// componentDidMount () {
	// 	axios.get('/ingredients.json')
	// 	.then(res=> this.setState({ingredients: res.data}))
	// 	.catch(err=>this.setState({ingredientLoadingError:true}))
	// }// handle async redux later, comment out for the time being
	componentDidMount () {
		this.props.onFetchIg();
	}

	// orderHandler = (ingredients) => {
	// 	const orderSum = Object.values(ingredients).reduce ((acc,cur)=>{
	// 	return acc+=cur},0); // loop through the values of the object
	// 	this.setState({order: orderSum > 0});//much simpler code
	// };

	// igChangeHandler = (event,type) => {
	// 	const updateIngredients = {...this.props.ingredients};// create a new object instead of mutate the old object
	// 	const oldCount = updateIngredients[type];//old count

	// 	const oldPrice = this.state.totalPrice; //get the old price
	// 	const priceAddition = ig_Price[type]; // fetch the price for ingredients
	// 	//if clicked the "more" button
	// 	if (event.target.textContent === 'More') {
	// 		updateIngredients[type] = oldCount +1 ; // update counts
	// 		let updatePrice = oldPrice + priceAddition; // update price
	// 		this.setState ((prevState,props)=>{
	// 	      return {
	// 	        ingredients: updateIngredients,
	// 	        totalPrice: updatePrice
	// 	      }
	// 	    })
	// 	} 
	// 	// if click the "less" button
	// 	else if (event.target.textContent === 'Less') {
	// 		//if old count is 0
	// 		if (oldCount <= 0) {
	// 			return;
	// 		} 
	// 		updateIngredients[type] = oldCount - 1;
	// 		let updatePrice = oldPrice - priceAddition; // update price
	// 		this.setState({
	// 			ingredients: updateIngredients,
	// 			totalPrice: updatePrice
	// 		})			
	// 	}
	// 	this.orderHandler(updateIngredients,axios);//call order handler function to update order state	
	// };

	orderSummaryHandler = () => {
    	this.setState ({showOrderSummary: true});
	};

	orderCancelHandler = () => {
		this.setState ({showOrderSummary: false});
	};

	orderContinueHandler = () => {
		// const queryParams = [];
		// for (let cur in this.props.ingredients) {
		// 	queryParams.push(encodeURIComponent(cur) + '=' + encodeURIComponent(this.props.ingredients[cur]))
		// }
		// queryParams.push('price=' + this.props.totalPrice);
		// const queryString = queryParams.join('&')
		// this.props.history.push({pathname: '/checkout', search:'?'+ queryString})

		// managing state through redux, makes it easier to share state between multiple components
		this.props.onPurchaseInit(); // initialize purchased state to false.
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {...this.props.ingredients}; 
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key]<=0;
		};
		
		let ingredientError = this.props.igLoadingError ? <p> Error loading ingredients </p> : <Spinner />;

		return (
			<div className={styles.BurgerBuilder}>
				{
					this.props.ingredients === null ? 
					ingredientError
					:
					<div>
						<Burger ingredients = {this.props.ingredients} />
						<BuildControls 
							ingredients = {this.props.ingredients} 
							moreIg = {this.props.onAddIg}
							lessIg = {this.props.onReduceIg}
							disabled = {disabledInfo}
							price = {this.props.totalPrice}
							order = {this.props.purchasable}
							clicked = {this.orderSummaryHandler}
						/>
						<Modal show = {this.state.showOrderSummary} loading={this.state.loading} modalClosed = {this.orderCancelHandler} >
							<OrderSummary 
								ingredients={this.props.ingredients} 
								orderCanceled={this.orderCancelHandler}
								orderContinued={this.orderContinueHandler}
								price={this.props.totalPrice} 
							/>							
						</Modal>
					</div>
				}		
			</div>
		)
	}
};

const mapStateToProps = (state) => {
	return {
		ingredients: state.ing.ingredients,
		totalPrice: state.ing.totalPrice,
		purchasable: state.ing.purchasable,
		igLoadingError: state.ing.igLoadingError //show spinner or not, fetching ingredients from firebase
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddIg: (ingType) => dispatch(actionCreators.moreIg(ingType)),
		onReduceIg: (ingType) => dispatch(actionCreators.lessIg(ingType)),
		onFetchIg: () => dispatch(actionCreators.initIngredients()),
		onPurchaseInit: () => dispatch(actionCreators.purchaseInit())
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));