import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
	      <div >
	          <Layout>
	          	<Switch>
		          	<Route path='/' exact component = {BurgerBuilder} />
		          	<Route path='/orders' component = {Orders} />
                    <Route path='/auth' component = {Auth} />
		          	<Route path='/checkout' component = {Checkout} />
	          	</Switch>
	          </Layout>
	      </div>
      </BrowserRouter>
    );
  }
}

export default App;
