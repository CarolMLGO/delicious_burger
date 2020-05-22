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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, expirationTime*1000); // setTimeout takes in ms as argument
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
        .then(response=> {
            //before dispatch, store tokens and expiration time in local storage
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken) //store token and expireation time on localstorage of browser
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => dispatch(authFail(error.response.data.error)))
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            //if the expiration date is larger than the current date, it means the token is not expired, then we can dispatch success
            if (expirationDate.getTime() > new Date().getTime()){
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000));//getTime() output ms
            } 
            //if already expired, simply dispatch log out
            else {
                dispatch(logout())
            }
        }
    }
}