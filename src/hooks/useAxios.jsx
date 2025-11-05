import axios from 'axios';



const axiosSecure = axios.create({
    baseURL: 'https://real-state-server-site.vercel.app',
});

const useAxios = () => {
    return axiosSecure;
};

export default useAxios;
