import axios from "axios";

export default axios.create({
  baseURL: "https://humanity-founders-assignment-txce.onrender.com",
  withCredentials: true,
});
