import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import ingredientsReducer from './containers/store/reducers/ingredientsReducer';
import orderReducer from './containers/store/reducers/orderReducer';
import authReducer from './containers/store/reducers/authReducer'

const rootReducer = combineReducers ({
	ing: ingredientsReducer,
	order: orderReducer,
    auth: authReducer
})


// const logger = store => {
// 	return next => action => {
// 			console.log('[Middleware] dispatching',action);
// 			const results = next(action);
// 			console.log('[Middleware] next state', store.getState())
// 			return results;
// 		}
// } // this is a middleware and it will run between the action and reducer.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
