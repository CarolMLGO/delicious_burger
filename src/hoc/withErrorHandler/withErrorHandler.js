import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {

	return class extends Component {
		state = {
			error: null
		}

		componentWillMount() {
			this.reqInterceptor= axios.interceptors.request.use(req => {
				// Edit the request (common use case is to add header information)
				this.setState({error:null})
				return req; //always return the request in the end, otherwise it will block the request
			});

			this.resInterceptor= axios.interceptors.response.use(res=> res, error => {
				this.setState({error: error})
			})
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.request.eject(this.resInterceptor); //remove interceptor when component unmounted, prevent memory leaks
		}

		errorConfirmedHandler = () => {
			this.setState({error: null})
		}

		render() {
			return (
				<Fragment>
					<Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
						{this.state.error? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			)
		}
	}
};

export default withErrorHandler;