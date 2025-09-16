import axios from "axios";
import { BASEURL } from "./ProductAPI";

const API_SIGNIN = `${BASEURL}/api/auth/signin`;

// Credentials should include { username, password }
export const signIn = async (credentials) => {
  try {
    const response = await axios.post(API_SIGNIN, credentials);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
