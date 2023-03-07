import axios from "axios";
import { api } from "./api";

const register = async (data: any) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (data: any) => {
  try {
    console.log("data: ", data);
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const me = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authServices = {
  register,
  login,
  me,
};
