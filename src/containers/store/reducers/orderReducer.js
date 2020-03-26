import {actionTypes} from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
	ordersFetched:[],
	fetchLoading: false
}

const orderReducer = (state=initialState,action) => {
	switch (action.type) {
		//purchasing burger -----------------------------
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			}
			return {
				...state,
				loading: false,
				purchased: true,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};
		case actionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased:false
			};
		//fetchning orders from firebase-----------------------------
		case actionTypes.FETCH_ORDER_START:
			return {
				...state,
				fetchLoading: true
			}
		case actionTypes.FETCH_ORDER_SUCCESS:
			return {
				...state,
				ordersFetched: action.orders,
				fetchLoading: false
			};
		case actionTypes.FETCH_ORDER_FAIL:
			return {
				...state,
				fetchLoading: false
			}

		default:
			return state;
	}
};

export default orderReducer;