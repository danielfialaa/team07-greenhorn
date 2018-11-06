import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
// 	headers: {
// 		Authorization : null ? localStorage.getItem('token'): this,
// }
});

export default api;
