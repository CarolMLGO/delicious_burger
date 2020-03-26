import React, { Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

class Orders extends Component {
	// state = {
	// 	orders: [],
	// 	loading: true
	// };

	// componentWillMount () {
	// 	axios.get('/orders.json')
	// 	.then(res=> {
	// 		const fetchedOrders = [];
	// 		for (let key in res.data) {
	// 			fetchedOrders.push({
	// 				...res.data[key],
	// 				id:key
	// 			});
	// 		}
	// 		this.setState({
	// 		orders: fetchedOrders,
	// 		loading: false
	// 	})})
	// 	.catch( err => {
	// 		this.setState({loading: false});
	// 	})
	// };
	//process javascript object from firebase
	// componentDidMount () {
	// 	this.state.dataInfo.map(cur=> {console.log('ingredients',cur.ingredients); console.log('price',cur.price)})
	// }

	componentWillMount(){
		this.props.onFetchOrder()
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
		fetchLoading: state.order.fetchLoading
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: () => dispatch(actionCreators.fetchOrder())
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));