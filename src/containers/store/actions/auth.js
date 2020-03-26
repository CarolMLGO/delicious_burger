import {actionTypes} from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        // const proxyurl = "https://cors-anywhere.herokuapp.com/"; // for "cors" error
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDccYKas0_IYO0hAOnMzK7aK6rFXFgbRFE";
        if(!isSignUp) {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccYKas0_IYO0hAOnMzK7aK6rFXFgbRFE';
        }
        axios.post(url, {'email':email,'password':password,'returnSecureToken':true})
        .then(response=> dispatch(authSuccess(response.data.idToken,response.data.localId)))
        .catch(error => dispatch(authFail(error.response.data.error)))
    };
}