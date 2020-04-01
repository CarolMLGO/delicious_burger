import React, { Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

class Orders extends Component {

	componentWillMount(){
		this.props.onFetchOrder(this.props.token,this.props.userId) //get the token from store, pass it to onFetchOrder action
	};

	render () {
		return (
			<div>
			{this.props.fetchLoading?
				<Spinner />
				:
				this.props.orders.map ( (order,index) => {
					return <Order key={order.id} ingredients={order.ingredients} price={order.price} index={index}/>
				})								
			}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.ordersFetched,
		fetchLoading: state.order.fetchLoading,
		token: state.auth.idToken,
		userId: state.auth.userId
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: (token,userId) => dispatch(actionCreators.fetchOrder(token,userId))
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));