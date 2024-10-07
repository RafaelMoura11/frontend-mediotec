import axios from 'axios';

const usersApi = axios.create({
  baseURL: "https://api-mediotec.onrender.com/",
});

export default usersApi;

const courseApi = axios.create({
  baseURL: "https://api-mediotec.onrender.com/",
});

const notificationApi = axios.create({
  baseURL: "https://api-mediotec.onrender.com/"
})
courseApi.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error); // Log the error
    return Promise.reject(error);
  }
);