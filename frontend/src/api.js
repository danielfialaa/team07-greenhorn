import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
	headers: {
		Authorization : localStorage.getItem('token')
}
});

export default api;
