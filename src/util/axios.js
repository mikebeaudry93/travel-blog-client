import axios from "axios";
import domain from "../util/domain";

const client = axios.create({ baseURL: domain });

client.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = token;
  return config;
});

export default client;
