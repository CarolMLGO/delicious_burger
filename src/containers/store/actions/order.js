import {actionTypes} from './actionTypes';
import axios from '../../../axios-order';
//-----------------------------------------------------------------------------------
export const orderSubmitStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	}
};

export const purchaseBurgerSuccess = (id,orderData) => {
 	return {
 		type: actionTypes.PURCHASE_BURGER_SUCCESS,
 		orderId: id,
 		orderData: orderData
 	}
};

export const purchaseBurgerFail = (error) => {
 	return {
 		type: actionTypes.PURCHASE_BURGER_FAIL,
 		error: error
 	}
};

export const orderSubmit = (orderData,token) => {
 	return dispatch => {
 	dispatch(orderSubmitStart());
	axios.post('/orders.json?auth='+token,orderData)// "orders.json" for firebase to work
		.then(res=> {
				dispatch(purchaseBurgerSuccess(res.data.name,orderData))
			}
		)
		.catch(error => {
			dispatch(purchaseBurgerFail(error))
		});
	}
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}

//-------------------------------------------------------------------------------------
export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDER_START,
	}
};

export const fetchOrderSuccess = (orders) => {
 	return {
 		type: actionTypes.FETCH_ORDER_SUCCESS,
 		orders: orders
 	}
};

export const fetchOrderFail = (error) => {
 	return {
 		type: actionTypes.FETCH_ORDER_FAIL,
 		error: error
 	}
};

export const fetchOrder = (token,userId) => {
	return dispatch => {
		dispatch(fetchOrderStart());
		//display user specific orders
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios.get('/orders.json'+ queryParams)
			.then(res=> {
						const fetchedOrders = [];
						for (let key in res.data) {
							fetchedOrders.push({
								...res.data[key],
								id:key
							})
						}
						dispatch(fetchOrderSuccess(fetchedOrders))
					}
				)
			.catch(error => {
				dispatch(fetchOrderFail(error))
		});
	}
};

