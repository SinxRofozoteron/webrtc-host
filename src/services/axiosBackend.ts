import axios from 'axios';

const axiosBackend = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    withCredentials: true,
    headers:{
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

export { axiosBackend };