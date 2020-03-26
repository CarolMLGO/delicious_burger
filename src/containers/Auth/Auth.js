import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Auth.module.scss';
import Spinner from '../../components/Spinner/Spinner';

import * as actionCreators from '../store/actions/actionCreators';
import { connect } from "react-redux";

class Auth extends Component {
    state={
        isSignUp: true
    };

    onSubmitHandler = (values,isSignUp) => {
        this.props.onAuth(values.email, values.password, isSignUp)
    }

    switchAuthHandler = () => {
        this.setState(preState=>{
            return {isSignUp: !preState.isSignUp};
        })
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
            <div>

            {this.props.loading ?
            <Spinner />
            :
            <Formik 
            initialValues = {{email:'',password:''}}
            validationSchema= {validation_Yup}>
            {
                (props) => {
                    const {values} = props;
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
                            <input type="submit" name="auth_submit" className={styles.Auth_submit} value={'Submit'} onClick={()=>this.onSubmitHandler(values,this.state.isSignUp)}/> 
                            <div className={styles.Auth_switch} onClick={this.switchAuthHandler}> 
                                Switch to {this.state.isSignUp? 'Sign In':'Sign Up'}
                            </div>
                            {/*<div className={styles.Signup_Register}>
                                <span> Already have an account? </span><br/>
                                        <Link to="/signin"> Sign In</Link>
                            </div>*/}
                        </div>)
                }
            }
            </Formik>
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actionCreators.auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Auth));