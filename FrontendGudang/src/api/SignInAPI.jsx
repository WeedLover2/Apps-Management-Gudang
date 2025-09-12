import axios from "axios";

export const BASEURL = 'http://localhost:5000';
const API_SIGNIN = `${BASEURL}/api/auth/signin`;

// Credentials should include { email, password }
export const signIn = async (credentials) => {
  try {
    const response = await axios.post(API_SIGNIN, credentials);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
