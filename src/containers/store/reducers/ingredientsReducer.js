import {actionTypes} from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 5,
	purchasable: false,
	igLoadingError: false
}

const ig_Price = {
	salad: 1,
	bacon: 1.5,
	cheese: 0.5,
	meat: 1.5
};

const ingredientsReducer = (state=initialState,action) => {
	let updatedIng = {...state.ingredients};
	switch (action.type) {
		case actionTypes.ADDIG:
	  		updatedIng[action.ingType] = state.ingredients[action.ingType] + 1;
	        return {
	      		...state,
		        ingredients: updatedIng,
		        totalPrice: state.totalPrice + ig_Price[action.ingType], 
		        purchasable: true
	        }
		case actionTypes.REDUCEIG:
			//if old count is 0
			if (state.totalPrice <= 0) {
				return state;
			} 
		  	updatedIng[action.ingType] = state.ingredients[action.ingType] - 1;
			return {
				...state,
		        ingredients: updatedIng,
		        totalPrice: state.totalPrice - ig_Price[action.ingType],
		        purchasable: Object.values(updatedIng).reduce ((acc,cur)=>{return acc+=cur},0) >0 
			}
		case actionTypes.SETIG:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				totalPrice: 5
			}
		case actionTypes.FETCH_IG_FAILED:
			return {
				...state,
				igLoadingError: true
			}
		default:
			return state
	}

};

export default ingredientsReducer;
