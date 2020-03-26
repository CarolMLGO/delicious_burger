import {actionTypes} from './actionTypes';
import axios from '../../../axios-order'; //import axios instance

export const moreIg = (ingType) => {
 	return {
 		type: actionTypes.ADDIG,
 		ingType:ingType
 	}
 };

export const lessIg = (ingType) => {
 	return {
 		type: actionTypes.REDUCEIG,
 		ingType:ingType
 	}
 };

 export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SETIG,
		ingredients: ingredients
	}
 };

 export const fetchIgError = () => {
 	return {
 		type: actionTypes.FETCH_IG_FAILED,
 	}
 };

 export const initIngredients = () => {
 	return dispatch => {
		axios.get('/ingredients.json')
			.then(res=> dispatch(setIngredients(res.data)))
			.catch(error => {
				dispatch(fetchIgError())
		});
 	}
 };


