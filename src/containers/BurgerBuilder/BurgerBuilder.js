import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import styles from './BurgerBuilder.module.scss';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import {withRouter} from 'react-router-dom';

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

	componentDidMount () {
		this.props.onFetchIg();
	}

	
	orderSummaryHandler = () => {
    	if (this.props.isAuthenticated) 
    		{
    			this.setState ({showOrderSummary: true})
    	}
    	else {
    			//if not authenticated, redirect to authenticate page
    			this.props.history.push('/auth')
    	}


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
		
		let ingredientError = this.props.igLoadingError ? <p style={{"textAlign":"center"}}> Error loading ingredients </p> : <Spinner />;

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
							isAuth = {this.props.isAuthenticated}
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
		igLoadingError: state.ing.igLoadingError, //show spinner or not, fetching ingredients from firebase
		isAuthenticated: state.auth.idToken
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder));