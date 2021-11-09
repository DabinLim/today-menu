import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import axios from 'axios';
import {
  requestAddRestaurant,
  requestCheckSession,
  requestDeleteAccount,
  requestModifyPassword,
  requestModifyUserName,
  requestSignIn,
  requestSignUp,
} from './authApis';
import { handleError } from '../utils';

export default {
  setSkipSignIn: (dispatch) => async (callback) => {
    try {
      const skipSignIn = await AsyncStorage.getItem('skipSignIn');
      if (skipSignIn) {
        dispatch({
          type: 'skip_sign_in',
          payload: {
            skipSignIn: true,
          },
        });
      } else {
        dispatch({
          type: 'skip_sign_in',
          payload: {
            skipSignIn: false,
          },
        });
      }
    } catch (e) {
      const error = handleError(e);
      callback(error);
    }
  },
  signUpAction: (dispatch) => async (email, password, name, callback) => {
    try {
      dispatch({
        type: 'sign_up',
        payload: {
          loading: true,
        },
      });

      const { user } = await requestSignUp(email, password, name);

      if (callback) {
        callback(user, null);
      }

      dispatch({
        type: 'sign_up',
        payload: {
          loading: false,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(null, error);
    }
  },
  signInAction: (dispatch) => async (email, password, callback) => {
    try {
      dispatch({
        type: 'sign_in',
        payload: {
          loading: true,
        },
      });

      const { user } = await requestSignIn(email, password);

      let token;
      if (user) {
        token = get(user, 'token');
        if (token) {
          console.log(token);
          await AsyncStorage.setItem('eat_what_token', token);
        }
      }

      if (callback) {
        callback(user, null);
      }

      dispatch({
        type: 'sign_in',
        payload: {
          user,
          token,
          loading: false,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(null, error);
    }
  },
  checkSession: (dispatch) => async (callback) => {
    try {
      const token = await AsyncStorage.getItem('eat_what_token');
      console.log(token);
      if (token) {
        const { user } = await requestCheckSession();
        dispatch({
          type: 'sign_in',
          payload: {
            user,
            token,
            loading: false,
          },
        });
      }
    } catch (e) {
      const error = handleError(e);
      callback(error);
    }
  },
  addBookMark: (dispatch) => async (restaurant, callback) => {
    try {
      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: true,
        },
      });

      const { bookmarkedRestaurant } = await requestAddRestaurant();

      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: false,
          bookmarkedRestaurant,
        },
      });
    } catch (e) {
      dispatch({
        type: 'add_bookmark',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(null, error);
    }
  },
  modifyUserName: (dispatch) => async (userName, callback) => {
    try {
      dispatch({
        type: 'modify_user_name',
        payload: {
          loading: true,
        },
      });

      const { user } = await requestModifyUserName(userName);

      if (user) {
        dispatch({
          type: 'modify_user_name',
          payload: {
            loading: false,
            userName,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: 'modify_user_name',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  modifyUserPassword: (dispatch) => async (pwd, callback) => {
    try {
      dispatch({
        type: 'modify_user_password',
        payload: {
          loading: true,
        },
      });

      const { data } = await requestModifyPassword(pwd);

      dispatch({
        type: 'modify_user_password',
        payload: {
          loading: false,
        },
      });

      callback(data, null);
    } catch (e) {
      dispatch({
        type: 'modify_user_password',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(null, error);
    }
  },
  deleteAccount: (dispatch) => async (callback) => {
    try {
      dispatch({
        type: 'delete_account',
        payload: {
          loading: true,
        },
      });

      const { data } = await requestDeleteAccount();

      console.log(data);

      await AsyncStorage.removeItem('eat_what_token');
      axios.defaults.headers.common.Authorization = undefined;

      dispatch({
        type: 'delete_account',
        payload: {
          loading: false,
          user: null,
        },
      });

      callback(data, null);
    } catch (e) {
      dispatch({
        type: 'delete_account',
        payload: {
          loading: false,
        },
      });
      const error = handleError(e);
      callback(error);
    }
  },
  signOutAction: (dispatch) => async (callback) => {
    try {
      await AsyncStorage.removeItem('eat_what_token');
      dispatch({
        type: 'sign_out',
        payload: {
          user: null,
        },
      });
    } catch (e) {
      const error = handleError(e);
      callback(error);
    }
  },
};
