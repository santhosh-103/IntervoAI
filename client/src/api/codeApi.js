import axios from "axios";

export const runCode = (data) =>
  axios.post(
    "http://localhost:5000/api/code/run",
    data
  );