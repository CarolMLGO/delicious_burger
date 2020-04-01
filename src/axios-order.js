import axios from 'axios';

const instance = axios.create({
	// baseURL: 'https://cors-anywhere.herokuapp.com/https://react-delicious-burger.firebaseio.com/';
	baseURL:'https://react-delicious-burger.firebaseio.com/'
});

//set some common headers when sending a request
// instance.defaults.headers.common['Authorizatoin'] = 'Auth token';

export default instance;