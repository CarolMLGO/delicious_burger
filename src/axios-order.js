import axios from 'axios';

const instance = axios.create({
	// baseURL: 'https://cors-anywhere.herokuapp.com/https://react-delicious-burger.firebaseio.com/';
	baseURL:'https://react-delicious-burger.firebaseio.com/'
});

export default instance;