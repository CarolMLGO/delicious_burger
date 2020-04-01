import React from 'react';
import styles from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class NavigationItems extends React.Component {

    render(){
        return (
            <ul className = {styles.NavigationItems} style={{flexDirection: this.props.flex}}>
                <NavigationItem link='/'>Burger Builder</NavigationItem>
                {this.props.isAuthenticated
                    ?<NavigationItem link='/orders'>Orders</NavigationItem>
                    :null
                }
                {this.props.isAuthenticated
                    ?<NavigationItem link='/logout'>Logout</NavigationItem>
                    :<NavigationItem link='/auth'>Authenticate</NavigationItem>
                }
            </ul>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken
    }
}

export default withRouter(connect(mapStateToProps,null)(NavigationItems));
