import axios from "axios";

const token = sessionStorage.getItem("token");
if (token) axios.defaults.headers.common.Authorization = token;

export default axios;
