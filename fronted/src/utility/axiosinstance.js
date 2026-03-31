import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use((config) => {
  let tocken = localStorage.getItem("tocken");
  if (tocken) {
    config.headers.Authorization = `Barear ${tocken}`;
  }
  return config;
});

export default instance;
