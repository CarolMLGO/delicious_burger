import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect } from 'react-router-dom';
import ContactInfo from './ContactInfo/ContactInfo';

import { connect } from 'react-redux';
// import * as actionCreators from '../store/actions/actionCreators';

class Checkout extends Component {

	//by using redux, we do not need state and componentDidMount
	// state = {
	// 	ingredients: {},
	// 	price:0
	// }

	// componentDidMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ing = {};
	// 	let price = 0;
	// 	for (let params of query) {
	// 		if (params[0] === 'price') {
	// 			price = params[1];
	// 		} else {
	// 			ing[params[0]]=Number(params[1])
	// 		}
			
	// 	}
	// 	this.setState({ingredients:ing, totalPrice: price})
	// }
	
	// componentWillMount() {
	// 	this.props.onPurchaseInit();
	// } // we do not want to initilize purchased state here. 

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<div>
				{
					this.props.ingredients === null ? 
					<Redirect to='/'/> 
					:
					<div>
						{this.props.purchased?<Redirect to='/' /> : null}
						<CheckoutSummary ingredients = {this.props.ingredients} checkoutCancelled = {this.checkoutCancelledHandler} checkoutContinued = {this.checkoutContinuedHandler} />
						<Route path={this.props.match.path + '/contact-data'} component={ContactInfo} />
					</div>
				}
				
			</div>
		)
	}
};

				// <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactInfo ingredients={this.props.ingredients} price = {this.props.totalPrice} {...props} />)} /> // we do not need to use this trick to access the data, using redux help get rid of this

const mapStateToProps = (state) => {
	return {
		ingredients: state.ing.ingredients,
		// totalPrice: state.ing.totalPrice,
		purchased: state.order.purchased
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onPurchaseInit: () => dispatch(actionCreators.purchaseInit())
// 	}
// }

export default connect(mapStateToProps)(Checkout);

// <Route path={this.props.match.path + '/contact-data'} component={ContactInfo} />