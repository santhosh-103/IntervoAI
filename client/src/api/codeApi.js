import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const runCode = (data) =>
  axios.post(
    `${API_URL}/api/code/run`,
    data
  );