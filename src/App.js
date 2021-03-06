import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./containers/store/actions/actionCreators";
//import components
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

// code splitting (lazy loading)
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    //further guards the routes
    //default routes for unauthenticated user:
    let routes = (
      <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" component={Auth} />
            <Redirect to="/" />
        </Switch>
    );
    //if user is authenticated
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Suspense fallback={<div>Loading...</div>}>
                <Route
                    path="/orders"
                    render={(props) => <Orders {...props} />}
                />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <Route
                    path="/checkout"
                    render={(props) => <Orders {...Checkout} />}
                />
            </Suspense>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
            <Layout>{routes}</Layout>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));