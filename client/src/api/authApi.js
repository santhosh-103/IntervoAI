import axios from "axios";

const API_URL =
  import.meta.env
    .VITE_API_URL;

export const loginUser =
  async (data) => {

    return axios.post(
      `${API_URL}/api/auth/login`,
      data
    );

  };

export const registerUser =
  async (data) => {

    return axios.post(
      `${API_URL}/api/auth/register`,
      data
    );

  };