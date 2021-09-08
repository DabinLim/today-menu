import { get } from 'lodash';
import axios from 'axios';

axios.defaults.baseURL = 'http://13.124.219.165:8080';

export const myAxios = async (method, url, requestBody, queryParams, headers) => {
  const options = {
    method,
    url,
    data: requestBody,
    params: queryParams,
    headers,
  };

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
    console.log(`response : ${JSON.stringify(response)}`);
  }
  return response;
};

export const handleImmer = (state, payload) => {
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
  const errorData = get(e, 'response.data');

  return console.error(`status : ${status}, errorData: ${JSON.stringify(errorData)}`);
};
