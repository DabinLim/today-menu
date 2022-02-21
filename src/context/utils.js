import { get } from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.REACT_APP_ROOT_URL;

export const myAxios = async (method, url, requestBody, queryParams, headers) => {
  const token = await AsyncStorage.getItem('eat_what_token');
  if (token) {
    console.log('yes token');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  const options = {
    method,
    url,
    data: requestBody,
    params: queryParams,
    headers,
  };
  console.log(`axios token : ${JSON.stringify(axios.defaults.headers.common.Authorization)}`);

  console.log(`>>>>>>>>>> Request **${method}** ${axios.defaults.baseURL}${url}`);
  if (requestBody) {
    console.log(`>>>>>>>>>> requestBody : ${JSON.stringify(requestBody)}`);
  }
  if (queryParams) {
    console.log(`>>>>>>>>>> queryParams : ${JSON.stringify(queryParams)}`);
  }
  if (headers) {
    console.log(`>>>>>>>>>> headers : ${JSON.stringify(headers)}`);
  }

  const response = await axios(options);
  if (response) {
    console.log(`>>>>>>>>>> Response **${method}** ${axios.defaults.baseURL}${url}`);
  }
  return response;
};

export const myImmer = (state, payload) => {
  const newState = { ...state };
  if (payload) {
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        newState[key] = value;
      }
    });
  }
  return newState;
};

export const handleError = (e) => {
  const status = get(e, 'response.status');
  const errorMessage = get(e, 'response.data.message') ? get(e, 'response.data.message') : e.message;

  return {
    message: errorMessage,
    data: e,
    status,
  };
};
