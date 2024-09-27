import axios from 'axios';

const usersApi = axios.create({
  baseURL: "https://api-mediotec.onrender.com/",
});

export default usersApi;
