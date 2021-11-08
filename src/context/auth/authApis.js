import { get } from 'lodash';
import { myAxios } from '../utils';

export const requestSignUp = async (email, password, name) => {
  const response = await myAxios(
    'POST',
    '/api/member/signup',
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
    '/api/member/login',
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
    '/api/member/me',
  );

  const data = get(response, 'data');
  return { user: data };
};

export const requestAddRestaurant = async (restaurant) => {
  const response = await myAxios(
    'POST',
    '/api/bookMark',
  );

  const data = get(response, 'data');
  return { bookmarkedRestaurant: data };
};

export const requestModifyUserName = async (userName) => {
  const response = await myAxios(
    'PATCH',
    '/api/member/name',
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
    '/api/member/password',
    {
      password: pwd,
    },
  );

  const data = get(response, 'data');
  return { user: data };
};
