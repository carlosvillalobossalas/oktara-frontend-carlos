import axios from "axios";

const logisticsApi = axios.create({
  baseURL: "http://localhost:8000/api/packages/",
});

export default logisticsApi;
