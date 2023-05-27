import  axios from 'axios';
import dotenv from "dotenv"


dotenv.config()

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.URL;

export const sendRequest = async (endpoint:string, method:string, data:any) => {
  const url = BASE_URL + endpoint;

  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
      data
    });

    return { success: true, data: response.data };
  } catch (error:any) {
    if (error.response) {
      return { msg:"bad response", error: error.response.data };
    } else {
      return { success: false, error: error.message };
    }
  }
};
