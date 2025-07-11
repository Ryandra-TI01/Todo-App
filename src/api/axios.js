import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Ganti sesuai alamat backend Laravel kamu
  withCredentials: true,            // Biar cookie sanctum ikut dikirim
});

export default API;
