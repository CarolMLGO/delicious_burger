import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import {withRouter} from'react-router-dom';
//import components
import ContactInfo from './ContactInfo/ContactInfo';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// const CheckoutSummary = React.lazy(() => import('../../components/Order/CheckoutSummary/CheckoutSummary'));
// const ContactInfo = React.lazy(() => import('./ContactInfo/ContactInfo'));

class Checkout extends Component {

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


const mapStateToProps = (state) => {
	return {
		ingredients: state.ing.ingredients,
		purchased: state.order.purchased
	}
}

export default connect(mapStateToProps)(Checkout);
