import axios from "axios";
import { BASEURL } from "./ProductAPI";

const API_USER = `${BASEURL}/api/users`;

// Get all user
export const getUsers = async () => {
	const response = await axios.get(API_USER);
	return response.data;
};

// Add new user (admin/basic user)
export const createUser = async (userData) => {
  const response = await axios.post(API_USER, userData);
  return response.data;
};
