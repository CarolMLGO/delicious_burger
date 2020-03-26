import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/Spinner/Spinner';
import styles from './ContactInfo.module.scss';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

class ContactInfo extends Component {
	state = {
		orderForm: {
	        name: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'text',
	                placeholder: 'Your Name'
	            },
	            value: '',
	            validation: {
	            	required: true
	            },
	            valid: false,
	            touched: false
	        },
	        street: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'text',
	                placeholder: 'Street'
	            },
	            value: '',
	            validation: {
	            	required: true
	            },
	            valid: false,
	            touched: false
	        },
	        zipCode: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'text',
	                placeholder: 'ZIP Code'
	            },
	            value: '',
	            validation: {
	            	required: true,
	            	minLength: 5,
	            	maxLength: 5
	            },
	            valid: false,
	            touched: false
	        },
	        country: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'text',
	                placeholder: 'Country'
	            },
	            value: '',
	            validation: {
	            	required: true
	            },
	            valid: false,
	            touched: false
	        },
	        email: {
	            elementType: 'input',
	            elementConfig: {
	                type: 'email',
	                placeholder: 'Your Email'
	            },
	            value: '',
	            validation: {
	            	required: true
	            },
	            valid: false,
	            touched: false
	        },
	        deliveryMethod: {
	            elementType: 'select',
	            elementConfig: {
	                options: [
	                    {value: 'fastest', displayValue: 'Fastest'},
	                    {value: 'cheapest', displayValue: 'Cheapest'}
	                ]
	            },
	            value: 'fastest',
	            validation: {},
	            valid: true
	        }
	    },
	    formIsValid: true,
	    loading: false
	}

	// check the validity of user input
	checkValidity (value, rules) {
		if(rules.required && value.trim()==='') return false;
		if(rules.minLength && rules.minLength > value.replace(/\s/g,'').length) return false;
		if(rules.maxLength && rules.maxLength < value.replace(/\s/g,'').length) return false;
		return true;
	}

	//dynamically handle user input and also update state
	onChangeHandler = (event) => {
		const inputEl = event.target.id;
		const orderFormCopy = {...this.state.orderForm};
		const orderElementCopy = {...orderFormCopy[inputEl]}; // clone deeply to the inner object, so not mutate the orignial
		orderElementCopy.value = event.target.value;
		orderElementCopy.valid = this.checkValidity(orderElementCopy.value,orderElementCopy.validation);
		orderElementCopy.touched = true; // check if user touch the input or not
		orderFormCopy[inputEl] = orderElementCopy;

		let formValid = true;
		for (let inputId in orderFormCopy) {
			formValid = orderFormCopy[inputId].valid && formValid;
		}
		this.setState({orderForm: orderFormCopy, formIsValid: formValid});
	}

	orderHandler = () => {
		// this.setState({loading: true});
		//gather user input data
		const formData = {};
		for (let formEl in this.state.orderForm) {
			formData[formEl] = this.state.orderForm[formEl].value;
		}
		// gather the data to send to the server
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		}
		this.props.onOrderSubmit(order);
		// //send a request the firebase server
		// axios.post('/orders.json',order)
		// .then(res => {
		// 	this.setState({loading: false});
		// 	this.props.history.push('/');
		// })
		// .catch(err=> this.setState({loading: false})); // for firebase specifically, add endpoint .json
		// // pass object this.state.ingredients {bacon:0,cheese:0,meat:0,salad:0}
	}

	render() {
		let formElArray = [];
		//need to loop through, so convert the object into an array form
		for (let key in this.state.orderForm) {
			formElArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		return (
			<div className={styles.ContactInfo}>
				<h4> Enter your Contact information: </h4>
				{
					this.props.loading ? 
					<Spinner />
					:
					(<form autoComplete="off" className={styles.Form} onSubmit={this.orderHandler}>
						{
							formElArray.map(formEl => (
								<Input 
									elementType={formEl.config.elementType} 
									elementConfig={formEl.config.elementConfig}
									value={formEl.config.value}
									key = {formEl.id}
									id = {formEl.id}
									invalid = {!formEl.config.valid && formEl.config.touched}
									shouldValidate = {formEl.config.validation}
									changed = {this.onChangeHandler}
								/>
							))
						}
						<Button btnType = 'Success' disabled={!this.state.formIsValid}> ORDER </Button>
					</form>)
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.ing.ingredients,
		totalPrice: state.ing.totalPrice,
		// orderForm: state.orderForm,
		// formIsValid: state.formIsValid,
    	loading: state.order.loading,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderSubmit: (orderData) => dispatch(actionCreators.orderSubmit(orderData)),

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactInfo,axios));