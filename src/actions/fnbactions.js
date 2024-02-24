import axios from "axios";
import { apiBaseURL, getDineinURL, getTablesURL } from "../utils/APIConstants";

export const getDineinOptions = () => {
    let url = apiBaseURL + getDineinURL
    return async (dispatch) => {
      try {
        const response = await axios.get(url)
        dispatch({ type: 'GET_DINE_IN_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'GET_DINE_IN_FAILURE', payload: error.message });
      }
    };
  };

export const getTablesAPI = () => {
    let url = apiBaseURL + getTablesURL
    return async (dispatch) => {
      try {
        const response = await axios.get(url)
        dispatch({ type: 'GET_TABLES_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'GET_TABLES_FAILURE', payload: error.message });
      }
    };
  };