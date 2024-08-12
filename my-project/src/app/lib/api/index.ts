import axios, { AxiosError, AxiosInstance } from "axios";
import { SetTokenCookies } from "../context/cookies";

const axiosInstance = (authorizationToken: string): AxiosInstance => {

    const instance = axios.create({
        headers: {
            authorization: authorizationToken,
        },
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                if (error.response.status === 401) {
                    console.error('axiosInstance Response error:', error.response.status);
                    SetTokenCookies('');
                }
                // console.error('Response data:', error.response.data);
                // console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // console.error('Request error:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                // console.error('Error:', error.message);
            }

            // Do something with the error (e.g., show a notification, log it, etc.)
            // Example: dispatch an action to update the global state with the error

            return Promise.reject(error); // Reject the promise with the caught error
        }
    );

    return instance;
};


export default axiosInstance;