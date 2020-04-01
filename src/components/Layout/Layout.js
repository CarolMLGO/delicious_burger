import React, {Component,Fragment} from 'react';
import styles from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSideDrawer: false
		}
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	toggleButtonHandler = () => {
		this.setState((preState)=>{
			return {showSideDrawer: !preState.showSideDrawer}
		});
	}

	render() {
		return (
			<Fragment>
				<Toolbar toggled={this.toggleButtonHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				<main className = {styles.Content} > 
					{this.props.children}
				</main>
			</Fragment>
		)
}
}

export default Layout;