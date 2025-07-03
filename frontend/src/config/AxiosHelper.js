import axios from "axios";
// export const baseURL = "http://localhost:8080";
export const baseURL = "https://estatespherebackend-production.up.railway.app";
export const httpClient = axios.create({
  baseURL: baseURL,
});
