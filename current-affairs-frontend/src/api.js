import axios from "axios";

const API = axios.create({
  baseURL: "https://current-affairs-app.onrender.com/api"
});

export default API;