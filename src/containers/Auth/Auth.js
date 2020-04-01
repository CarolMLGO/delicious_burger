import React, { Component,Fragment } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Auth.module.scss';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from "react-redux";

import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
    state={
        isSignUp: true
    };

    onSubmitHandler = (values,isSignUp) => {
        this.props.onAuth(values.email, values.password, isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(preState=>{
            return {isSignUp: !preState.isSignUp};
        })
    }

    componentDidUpdate() {
        //if user is authenticated, but not add ingredients, will redirect to burger builder page
        if(this.props.token && (!this.props.purchasable)) {
            this.props.history.replace('/')
        } 
        //if user is authenticated and add ingredients to a burger, will redirect to check out page after log in
        else if (this.props.token && this.props.purchasable) {
            this.props.history.replace('/checkout')
        }
    }
      
    render() {
        const validation_Yup = Yup.object({
                    email: Yup.string()
                        .email("Invalid email address")
                        .required('Required'),
                    password: Yup.string()
                        .required('No password provided.') 
                        .min(8, 'Password is too short - should be 8 chars minimum.up')
                });
        return(
            <Fragment>
            {this.props.loading 
            ?<Spinner />
            :
            <Formik 
            initialValues = {{email:'',password:''}}
            validationSchema= {validation_Yup}>
            {
                (props) => {
                    const {values,isValid} = props;
                    return(
                        <div className={styles.Auth}>
                            <h1> {this.state.isSignUp? 'Sign Up':'Sign In' } </h1>
                            {this.props.error?<div className={styles.error}>{this.props.error.message}</div>:null}
                            <Field name="email" type="text" placeholder="E-mail"/>
                            <ErrorMessage name="email">
                                {msg=><div className={styles.error}>{msg}</div>}
                            </ErrorMessage>
                            <Field name="password" type="text" placeholder="password"/>
                            <ErrorMessage name="password">
                                {msg=><div className={styles.error}>{msg}</div>}
                            </ErrorMessage>
                            <Button btnType = 'Success' disabled={!isValid} clicked={()=>this.onSubmitHandler(values,this.state.isSignUp)}> SUBMIT </Button>
                            <div className={styles.Auth_switch} onClick={this.switchAuthHandler}> 
                                 {this.state.isSignUp? 'Already have an account? Switch to Sign In':'No account? Switch to Sign Up'}
                            </div>
                        </div>)
                }
            }
            </Formik>
            }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,//before we got a response from the server
        error: state.auth.error, //display authenticaiton error message
        token: state.auth.idToken,
        purchasable: state.ing.purchasable //to see if the user already built a burger or not
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //send requests to server
        onAuth: (email,password,isSignUp) => dispatch(actionCreators.auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);

// <input type="submit" name="auth_submit" className={styles.Auth_submit} value={'Submit'} onClick={()=>this.onSubmitHandler(values,this.state.isSignUp)}/> 