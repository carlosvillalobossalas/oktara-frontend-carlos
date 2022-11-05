import axios from "axios";

const logisticsApi = axios.create({
  // baseURL: "http://localhost:8000/api/packages/",
  baseURL: "https://oktara-carlos.herokuapp.com/api/packages/",
});

export default logisticsApi;
