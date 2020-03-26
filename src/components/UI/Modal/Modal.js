import React, {Component,Fragment} from 'react';
import styles from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	//this could be a functional component, doesn't have to be a class component
	shouldComponentUpdate (nextProps,nextState) {
		// if(nextProps.show !== this.props.show) {
		// 	return true;
		// } else {
		// 	return false;
		// }

		//shorter expression:
		return nextProps.show !== this.props.show || nextProps.loading !== this.props.loading; // in order to make spinner work, need to make some changes here, when props.children of modal or loading props change, modal component also need to update
	}

	render() {
		return(
			<Fragment>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div className = {[styles.Modal,  this.props.show ? styles.Modal_Show : styles.Modal_notShow].join(' ')}> 
					{this.props.children}
				</div>
			</Fragment>
		)
	}
};

// export default React.memo(modal,(prevProps,newProps)=>{
// 	return newProps.show === prevProps.show
// });

export default Modal;