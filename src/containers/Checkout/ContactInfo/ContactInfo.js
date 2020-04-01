import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import components
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/Spinner/Spinner';
import styles from './ContactInfo.module.scss';
import axios from '../../../axios-order';

class ContactInfo extends Component {

	orderHandler = (formData) => {
		// gather the data to send to the server
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
			userId: this.props.userId,
			time: new Date()
		}
		this.props.onOrderSubmit(order,this.props.token);
	}

	render() {
		const validation_Yup = Yup.object({
		 			name: Yup.string()
		 				.required("Required")
		 				.max(20,'Name is too long - should be less than 20 chars.'),
		 			street: Yup.string()
		 				.required("Required"),
		 			zipCode: Yup.number()
	 				    // lowest zip code is 00501 https://facts.usps.com/map/#fact147
					    .min(501, "Invalid zip code.")
					    // highest zip code is 99950 https://facts.usps.com/map/#fact148
					    .max(99950, "Invalid zip code.")
					    .required("Required"),
		 			country: Yup.string()
		 				.required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required('Required'),
                    phoneNumber: Yup.number()
	                    .required('Phone number is required!')
	                    .integer('Phone number must be integer!')
	                    .positive('Phone number must be positive!')
                });
		 return (
		 	<div>
            {this.props.loading 
            ? <Spinner />
            :
			 	<Formik
				initialValues = {{name:'',street:'',zipCode:'',country:'',email:'',phoneNumber:'',deliveryMethod:'fastest'}}
		        validationSchema= {validation_Yup}
		        >
		            {
		            	(props) => {
		            		const {values,isValid} = props;
		            		return (
		            			<div className={styles.ContactInfo}>
		            				<h4> Enter your contact information </h4>
			            			<Field type="text" name="name" placeholder="Name"/>
		                            <ErrorMessage name="name">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					            	<Field type="text" name="street" placeholder="Street"/>
		                            <ErrorMessage name="street">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					            	<Field type="number" name="zipCode" placeholder="ZIP code"/>
		                            <ErrorMessage name="zipCode">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					            	<Field type="text" name="country" placeholder="Country"/>
					            	<ErrorMessage name="country">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					            	<Field type="text" name="email" placeholder="Email"/>
					            	<ErrorMessage name="email">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					            	<Field type="number" name="phoneNumber" placeholder="Phone Number"/>
					            	<ErrorMessage name="phoneNumber">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					            	<Field as="select" name="deliveryMethod">
					                    <option value="fastest">Fastest</option>
					                    <option value="cheapest">Cheapest</option>
					                </Field>
					                <ErrorMessage name="deliveryMethod">
                                		{msg=><div className={styles.error}>{msg}</div>}
                            		</ErrorMessage>
					                <Button btnType = 'Success' disabled={!isValid} clicked={()=>this.orderHandler(values)}> ORDER </Button>
		            			</div>
		            		)
		            	}
		            }
				</Formik>
			}
			</div>
		 )
	}
}
const mapStateToProps = (state) => {
	return {
		ingredients: state.ing.ingredients,
		totalPrice: state.ing.totalPrice,
    	loading: state.order.loading,
    	token: state.auth.idToken,
		userId: state.auth.userId
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderSubmit: (orderData,token) => dispatch(actionCreators.orderSubmit(orderData,token)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactInfo,axios));