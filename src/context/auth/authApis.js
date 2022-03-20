import { get } from 'lodash';
import { myAxios } from '../utils';

export const requestSignUp = async (email, password, name) => {
  const response = await myAxios(
    'POST',
    '/api/members/signup',
    {
      email,
      password,
      name,
      memberRole: 'USER',
    },
  );

  const data = get(response, 'data');
  console.log(`data : ${data}`);
  return { user: data };
};

export const requestSignIn = async (email, password) => {
  const response = await myAxios(
    'POST',
    '/api/members/login',
    {
      email,
      password,
    },
  );
  const data = get(response, 'data');
  return { user: data };
};

export const requestCheckSession = async () => {
  const response = await myAxios(
    'GET',
    '/api/members/me',
  );

  const data = get(response, 'data');
  return { user: data };
};

export const requestGetBookmarkedRestaurant = async () => {
  const response = await myAxios(
    'GET',
    'api/book-marks',
  );

  const data = get(response, 'data');
  return { bookmarkedRestaurant: data };
};

export const requestAddBookmarkedRestaurant = async (
  place_name,
  category_group_name,
  address_name,
  road_address_name,
  phone,
  place_url,
  x,
  y,
) => {
  const response = await myAxios(
    'POST',
    '/api/book-marks',
    {
      name: place_name,
      category: category_group_name,
      address: address_name,
      roadAddress: road_address_name,
      phoneNumber: phone,
      url: place_url,
      x,
      y,
    },
  );

  const data = get(response, 'data');
  return { bookmarkedRestaurant: data };
};

export const requestRemoveBookmarkedRestaurant = async (restaurantId) => {
  await myAxios(
    'DELETE',
    `/api/book-marks/${restaurantId}`,
  );
};

export const requestModifyUserName = async (userName) => {
  const response = await myAxios(
    'PATCH',
    '/api/members/name',
    {
      name: userName,
    },
  );

  const data = get(response, 'data');
  return { user: data };
};

export const requestModifyPassword = async (pwd) => {
  const response = await myAxios(
    'PATCH',
    '/api/members/password',
    {
      password: pwd,
    },
  );

  const data = get(response, 'data');
  return { data };
};

export const requestDeleteAccount = async () => {
  const response = await myAxios(
    'DELETE',
    'api/members',
  );

  const data = get(response, 'data');
  return { data };
};

export const requestFindPassword = async (email, name) => {
  const response = await myAxios(
    'GET',
    `/api/members/password-reset?email=${email}&name=${name}`,
  );
  console.log(response);
  return response;
};
