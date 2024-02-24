import axios from "axios";
import { apiBaseURL, loginApiURL } from "../utils/APIConstants";

export const userLogin = (payload) => {
    let url = apiBaseURL + loginApiURL
    return async (dispatch) => {
      try {
        const response = await axios.post(url, payload)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILURE', payload: error.message });
      }
    };
  };