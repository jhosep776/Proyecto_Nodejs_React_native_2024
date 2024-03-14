import axios from 'axios';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.baseURL = 'http://192.168.100.15:3900/api';
export default axios;